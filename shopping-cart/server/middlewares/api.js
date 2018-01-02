const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const bodyParser = require("body-parser");
const uuid = require("uuid");

function setupDb() {
  const adapter = new FileSync("db.json");
  const db = low(adapter);

  db.defaults({ cart: [], products: [] }).value();

  const products = [
    {
      name: "Product 1",
      description: "Screwdriver",
      price: "9.75",
      tax: "19"
    },
    {
      name: "Product 2",
      description: "Electric screwdriver",
      price: "49.50",
      tax: "19"
    },
    {
      name: "Product 3",
      description: "Basic on-off switch",
      price: "4.99",
      tax: "7"
    },
    {
      name: "Product 4",
      description: "Press button",
      price: "4.99",
      tax: "7"
    },
    {
      name: "Product 5",
      description: "Switch with motion detector",
      price: "12.95",
      tax: "21"
    }
  ];
  products.forEach(product => {
    db
      .get("products")
      .push({ id: uuid(), ...product })
      .value();
  });
  return db;
}

module.exports = app => {
  const db = setupDb();

  app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");
    // Request methods you wish to allow
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    // Request headers you wish to allow
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type, Authorization"
    );

    // Pass to next layer of middleware
    next();
  });

  app.use(bodyParser.json());

  app.get("/api/products", (req, res) => {
    res.send(
      db
        .get("products")
        .toArray()
        .value()
    );
  });

  app.get("/api/cart", (req, res) => {
    const cart = db
      .get("cart")
      .toArray()
      .value();
    const total = calculateTotal();
    res.send({ cart, total });
  });

  app.post("/api/cart", (req, res) => {
    const cartProduct = req.body.product;
    const existingProduct = db
      .get("cart")
      .find({ productId: cartProduct.productId })
      .value();
    if (existingProduct) {
      console.log(existingProduct);
      return res.send(403);
    }
    const product = db
      .get("products")
      .find({ id: cartProduct.productId })
      .value();
    Object.assign(cartProduct, product);
    cartProduct.id = uuid();
    cartProduct.productId = product.id;
    let subTotal =
      Number.parseInt(cartProduct.qty) * Number.parseFloat(cartProduct.price);
    cartProduct.productTotal = (
      subTotal * Number.parseInt(cartProduct.tax) / 100 +
      subTotal
    ).toFixed(2);
    const serverProduct = db
      .get("cart")
      .push(cartProduct)
      .value();
    const total = calculateTotal();
    res.send({ cart: serverProduct, total });
  });

  app.patch("/api/cart/:id", (req, res) => {
    const newProduct = req.body.product;
    const product = db
      .get("products")
      .find({ id: newProduct.productId })
      .value();
    Object.assign(newProduct, product);
    let subTotal =
      Number.parseInt(newProduct.qty) * Number.parseFloat(newProduct.price);
    newProduct.productTotal = (
      subTotal * Number.parseInt(newProduct.tax) / 100 +
      subTotal
    ).toFixed(2);
    const serverProduct = db
      .get("cart")
      .find({ id: req.params.id })
      .assign(newProduct)
      .value();
    const total = calculateTotal();
    res.send({ product: serverProduct, total });
  });

  app.delete("/api/cart/:id", (req, res) => {
    const product = db
      .get("cart")
      .remove({ id: req.params.id })
      .value();
    const total = calculateTotal();
    const deletedProduct = product[0];
    res.send({ product: deletedProduct, total });
  });

  app.delete("/api/cart", (req, res) => {
    const cart = db.set("cart", []).value().cart;
    const total = calculateTotal();
    res.send({ cart, total });
  });

  function calculateTotal() {
    const tax = { totalTax: 0 };
    let sum = 0;
    let netTotal = 0;
    let grandTotal = 0;
    const cart = db
      .get("cart")
      .toArray()
      .value();
    for (let product of cart) {
      sum += Number.parseInt(product.qty) * Number.parseFloat(product.price);
      netTotal = Number.parseFloat(sum).toFixed(2);
      const n = (
        Number.parseInt(product.qty) *
        Number.parseFloat(product.price) *
        Number.parseInt(product.tax) /
        100
      ).toFixed(2);
      tax[product.tax] = (tax[product.tax] || 0) + Number.parseFloat(n);
    }
    for (const i in tax) {
      if (i !== "totalTax") {
        tax.totalTax += tax[i];
        tax[i] = tax[i].toFixed(2);
      }
    }
    tax.totalTax = tax.totalTax.toFixed(2);
    grandTotal = (parseFloat(netTotal) + parseFloat(tax.totalTax)).toFixed(2);
    return { netTotal, tax, grandTotal };
  }
};
