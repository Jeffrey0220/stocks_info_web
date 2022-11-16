import React from "react";

import StocksCard from "../components/cards/StocksCard";

import Footer from "../components/Footer";
import StocksTable from "../components//tables/StocksTable";

function Stocks() {
  return (
    <div>
      <div>
        <StocksCard />
      </div>

      <StocksTable />

      <Footer />
    </div>
  );
}

export default Stocks;
