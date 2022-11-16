import React from "react";
import navlogo from "../images/navlogo.png";

import styles from "./Home.module.css";

import Footer from "../components/Footer";
import StocksCard from "../components/cards/StocksCard";
import CompanyCard from "../components/cards/CompanyCard";
import HistoricalPriceCard from "../components/cards/HistoricalPriceCard";
function Home() {
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.container}>
          <div>
            <h1>Welcome, stocks lover.</h1>
            <h3>
              StocksHub is a remarkable stocks market information website.
            </h3>
          </div>

          <img src={navlogo} alt="" />
        </div>
      </div>

      <StocksCard />
      <CompanyCard />
      <HistoricalPriceCard />

      <Footer />
    </div>
  );
}
export default Home;
