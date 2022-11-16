import React from "react";
import Cards from "./Cards";

function HistoricalPriceCard() {
  const props = {
    color: "warning",
    title: "HistoricalPrice",
    subtitle: "Historical prices information📈",
    text: "Looking up historical prices of stocks with a line chart of closing prices.",
  };
  return <Cards {...props} />;
}

export default HistoricalPriceCard;
