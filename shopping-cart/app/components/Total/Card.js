import styled from "styled-components";

const Card = styled.div`
  transition: box-shadow 0.25s, -webkit-box-shadow 0.25s;
  padding: 24px;
  margin: 0.5rem 0 1rem 0;
  border-radius: 2px;
  background-color: #fff;
  float: right !important;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
  min-width: 250px;
`;

export default Card;
