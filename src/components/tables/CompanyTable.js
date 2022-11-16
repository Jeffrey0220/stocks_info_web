import React, { useState } from "react";
import styles from "./CompanyTable.module.css";
import { AgGridReact } from "ag-grid-react";
import useCompanyApi from "../../apis/CompanyApi";
import SearchBar from "../SearchBar";
import Cards from "../cards/Cards";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { Badge } from "reactstrap";
import { useNavigate } from "react-router-dom";

function CompanyTable(props) {
  //useState for getting symbol from double clicking table of Stock page and searching function
  const [search, setSearch] = useState(props.symbol);
  //useState for fetching data from api
  const { loading, companyDatas, chekcExist, error } = useCompanyApi(search);
  //gridApi for onRowDoubleClicked event
  const [gridApi, setGridApi] = useState();

  //format data for ag-grid table
  const rowData = [
    {
      symbol: companyDatas.Symbol,
      name: companyDatas.Name,
      country: companyDatas.Country,
      sector: companyDatas.Sector,
      industry: companyDatas.Industry,
      marketcapitalization: companyDatas.MarketCapitalization,
      sharesoutstanding: companyDatas.SharesOutstanding,
      weekhigh: companyDatas["52WeekHigh"],
      weeklow: companyDatas["52WeekLow"],
    },
  ];

  const columnDefs = [
    { headerName: "Symbol", field: "symbol" },
    { headerName: "Name", field: "name" },
    { headerName: "Country", field: "country" },
    { headerName: "Sector", field: "sector" },
    { headerName: "Industry", field: "industry" },
    { headerName: "MarketCapitalization", field: "marketcapitalization" },
    { headerName: "SharesOutstanding", field: "sharesoutstanding" },
    { headerName: "52WeekHigh", field: "weekhigh" },
    { headerName: "52WeekLow", field: "weeklow" },
  ];

  const tableProps = {
    rowData: rowData,
    columnDefs: columnDefs,

    rowSelection: "single",
  };

  //setup card content
  const cardProps = {
    color: "info",
    title: companyDatas.Name + ` (${companyDatas.Symbol})`,
    subtitle: companyDatas.Address,
    text: companyDatas.Description,
  };

  ////setup ag-grid table event handler of onRowdoubleClicked
  const onGridReady = (params) => {
    setGridApi(params.api);
  };
  let navigate = useNavigate();

  const doubleClickHandler = () => {
    let selectedNodes = gridApi.getSelectedNodes();
    let selectedData = selectedNodes.map((node) => node.data);
    let selectedDataString = selectedData.map((node) => `${node.symbol}`);
    navigate("/historicalprice", { state: { symbol: selectedDataString } });
  };

  //checking if searched symobl exists
  function NotExist() {
    if (search && chekcExist === false)
      return (
        <Badge color="warning" style={{ fontSize: 20 }}>
          Not an existing stock symbol, try agian.
        </Badge>
      );
  }

  //return of different conditons
  if (loading) {
    return <p>loading...</p>;
  }
  if (error) {
    return <p>Someting went wrong: {error.message}</p>;
  }

  return (
    <div>
      <div className={styles.container}>
        <NotExist />

        <Badge color="info" style={{ fontSize: 20 }}>
          Search Stocks Symbols:
        </Badge>

        <SearchBar onSubmit={setSearch} placeholder="Enter a stock symbol" />
      </div>
      <div className={styles.prompt}>
        <h6>
          Historical price by double clicking your chosen stock in the table
        </h6>
      </div>
      {companyDatas.Name && (
        <div
          className="ag-theme-balham"
          style={{
            height: "100px",
            width: "100%",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <AgGridReact
            onGridReady={onGridReady}
            columnDefs={tableProps.columnDefs}
            rowData={tableProps.rowData}
            pagination={tableProps.pagination}
            paginationPageSize={tableProps.pages}
            defaultColDef={tableProps.defaultColDef}
            rowSelection={tableProps.rowSelection}
            onRowDoubleClicked={doubleClickHandler}
          />
        </div>
      )}

      <div>{companyDatas.Name && <Cards {...cardProps} />}</div>
    </div>
  );
}

export default CompanyTable;
