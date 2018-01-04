class CreateGeoCaches < ActiveRecord::Migration[5.1]
  def change
    create_table :geo_caches do |t|
      t.string :message, null: false
      t.float :lat, precision:10, scale:6, null: false
      t.float :long, precision:10, scale:6, null: false

      t.timestamps
    end
    # Adding latitude and longitude indexes to improve distance related queries.
    # The indexes are not unique because they may contain multiple messages
    add_index :geo_caches, :lat
    add_index :geo_caches, :long
  end
end
