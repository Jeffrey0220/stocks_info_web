import React, { useEffect, useState } from "react";

function useCompanyApi(search) {
  const [loading, setLoading] = useState(true);
  const [companyDatas, setCompanyDatas] = useState([]);
  const [error, setError] = useState(null);
  const [chekcExist, setCheckExist] = useState(true);

  function isExist(data) {
    if (Object.keys(data).length === 0) {
      setCheckExist(false);
    } else {
      setCheckExist(true);
    }
  }
  const API_KEY =process.env.REACT_APP_API_KEY1;
  async function getCompanyDatas(search) {
    const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${search}&apikey=${API_KEY}`;
    let res = await fetch(url);
    let data = await res.json();
    console.log(data);
    isExist(data);
    return data;
  }

  useEffect(() => {
    (async () => {
      try {
        setCompanyDatas(await getCompanyDatas(search));
        setLoading(false);
      } catch (err) {
        setError(error);
        setLoading(false);
      }
    })();
  }, [search]);
  return { loading, companyDatas, chekcExist, error: null };
}

export default useCompanyApi;
