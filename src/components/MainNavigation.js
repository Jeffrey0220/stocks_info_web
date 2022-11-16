import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import HistoricalPrice from "../pages/HistoricalPrice";
import Home from "../pages/Home";
import Company from "../pages/Company";
import Stocks from "../pages/Stocks";
import NotFound from "../pages/NotFound";
import styles from "./MainNavigation.module.css";

function MainNavigetion() {
  return (
    <Router>
      <nav className={styles.navbar}>
        <div className={styles.container}>
          <div className={styles.logo}>StocksHub.com</div>
          <ul className={styles.nav}>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/stocks">Stocks</NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stocks" element={<Stocks />} />
        <Route path="/company" element={<Company />} />
        <Route path="/historicalprice" element={<HistoricalPrice />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default MainNavigetion;
