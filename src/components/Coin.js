import React from "react";
import styled from "styled-components";
// styled components
const Td = styled.td`
  color: ${(props) =>
    props.priceChange > 0 ? "#147f14" : "#cb1a1a"} !important;
  color: ${(props) => props.priceChange === 0 && "#377596"} !important;
`;

const Coin = ({ symbol, name, price, priceChange, image }) => {
  return (
    <tr>
      <td>{symbol}</td>
      <td>{name}</td>
      <td>{price.toLocaleString()}</td>
      <Td priceChange={priceChange}>{priceChange.toLocaleString()}</Td>
      <td>
        <img src={image} alt="cryptoImage" />
      </td>
    </tr>
  );
};

export default Coin;
