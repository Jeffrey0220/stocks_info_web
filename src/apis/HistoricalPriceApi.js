import React, { useEffect, useState } from "react";

function useHistoricalPriceApi(search) {
  const [loading, setLoading] = useState(true);
  const [historicalPrice, setHistoricalPrice] = useState([]);
  const [error, setError] = useState(null);
  const API_KEY = process.env.REACT_APP_API_KEY2;
  async function getHistoricalPrice(search) {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${search}&apikey=${API_KEY}`;
    let res = await fetch(url);
    let data = await res.json();
    let timePrices = await data["Time Series (Daily)"];
    console.log(timePrices);
    const prices = Object.values(timePrices);
    const times = Object.keys(timePrices);
    console.log(prices[0]["1. open"]);
    console.log(times[0]);
    console.log(prices.length);
    const rowDatas = [];
    for (let i = 0; i < prices.length; i++) {
      rowDatas.push({
        date: times[i],
        open: prices[i]["1. open"],
        high: prices[i]["2. high"],
        low: prices[i]["3. low"],
        close: prices[i]["4. close"],
        volume: prices[i]["5. volume"],
      });
    }
    console.log(rowDatas);

    return rowDatas;
  }

  useEffect(() => {
    (async () => {
      try {
        setHistoricalPrice(await getHistoricalPrice(search));
        setLoading(false);
      } catch (err) {
        setError(error);
        setLoading(false);
      }
    })();
  }, [search]);

  return { loading, historicalPrice, error };
}

export default useHistoricalPriceApi;
