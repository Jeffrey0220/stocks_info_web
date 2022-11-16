import React from "react";
import Cards from "./Cards";

function StocksCard() {
  const props = {
    color: "primary",
    title: "Stocks",
    subtitle: "Broad stocks information👓",

    text: "We provide basic information of Nasdaq 100 and Dow Jones stocks for your exploration. ",
  };
  return <Cards {...props} />;
}
export default StocksCard;
