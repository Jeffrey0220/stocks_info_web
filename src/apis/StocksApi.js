import React, { useEffect, useState } from "react";

function useStocksApi(index) {
  const [loading, setLoading] = useState(true);
  const [stocksDatas, setStocksDatas] = useState([]);
  const [error, setError] = useState(null);
  const API_KEY = `bf186a537bcf074adc5473d7be793521`; //alternative:`7ec131ab714b8a9e7d682e789a17c5eb`
  let init = "nasdaq_constituent";
  async function getStocksDatas(index) {
    const url = `https://financialmodelingprep.com/api/v3/${
      index === "" ? init : index
    }?apikey=${API_KEY}`;
    let res = await fetch(url);
    let data = await res.json();
    console.log(data);

    return data.map((company) => ({
      symbol: company.symbol,
      name: company.name,
      sector: company.sector,
      subsector: company.subSector,
      headquarter: company.headQuarter,
      foundeddate: company.founded,
      cik: company.cik,
    }));
  }

  useEffect(() => {
    (async () => {
      try {
        setStocksDatas(await getStocksDatas(index));
        setLoading(false);
      } catch (err) {
        setError(error);
        setLoading(false);
      }
    })();
  }, [index]);
  return { loading, stocksDatas, error };
}

export default useStocksApi;
