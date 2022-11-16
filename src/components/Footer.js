import React from "react";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <div className={styles.footer}>
      <footer>
        <div className={styles.container}>
          <div className={styles.row}>
            <h3>About</h3>
            <ul>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://site.financialmodelingprep.com/developer"
                >
                  Financial Modeling Prep
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.alphavantage.co/"
                >
                  Alpha Vantage
                </a>
              </li>
            </ul>
          </div>
          <p className={styles.copyright}>StockHub.com © 2022</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
