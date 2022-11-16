import React, { useState } from "react";
import Buttons from "../Buttons";
import Select from "react-select";
import useStocksApi from "../../apis/StocksApi";
import styles from "./StocksTable.module.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { Badge } from "reactstrap";
import { useNavigate } from "react-router-dom";

function StocksTable() {
  //useState for changing stock market
  const [index, setIndex] = useState("");
  //useState for selecting sector
  const [select, setSelect] = useState("");
  //useState for fetching data from api
  const { loading, stocksDatas, error } = useStocksApi(index);
  //gridApi for QuickFilter function and onRowDoubleClicked event
  const [gridApi, setGridApi] = useState();

  //format stocksData for sector dropdown select filter
  const selectData = stocksDatas;
  const selectOptions = selectData.map((data) => data.sector);
  console.log(selectOptions);
  const uniqueSelectOptions = Array.from(new Set(selectOptions));
  console.log(uniqueSelectOptions);

  const FormatedUniqueSelectOptions = uniqueSelectOptions.map((option) => ({
    value: option,
    label: option,
  }));
  console.log(FormatedUniqueSelectOptions);

  //using condition to fliter data when using dropdown select filter
  let rowData = [];
  if (select === "") {
    rowData = stocksDatas;
  } else {
    rowData = stocksDatas.filter((data) => data.sector === select);
  }
  console.log(rowData);

  //format data and props for ag-grid table display
  const columnDefs = [
    { headerName: "Symbol", field: "symbol" },
    { headerName: "Name", field: "name" },
    { headerName: "Sector", field: "sector" },
    { headerName: "SubSector", field: "subsector" },
    { headerName: "HeadQuarter", field: "headquarter" },
    { headerName: "FoundedDate", field: "foundeddate" },
    { headerName: "CIK", field: "cik" },
  ];

  const props = {
    rowData: rowData,
    columnDefs: columnDefs,
    pagination: true,
    pages: 15,

    animateRows: true,
    defaultColDef: {
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
    rowSelection: "single",
  };

  let navigate = useNavigate();

  //ag-grid table event handler of onRowdoubleClicked
  const doubleClickHandler = () => {
    let selectedNodes = gridApi.getSelectedNodes();
    let selectedData = selectedNodes.map((node) => node.data);
    let selectedDataString = selectedData.map((node) => `${node.symbol}`);
    navigate("/company", { state: { symbol: selectedDataString } });
  };

  //using GridApi to implement QuickFilter function
  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const handleQuickFilter = (event) => {
    gridApi.setQuickFilter(event.target.value);
  };

  // return of different conditions
  if (loading) {
    return <p>loading...</p>;
  }
  if (error) {
    return <p>Someting went wrong: {error.message}</p>;
  }

  return (
    <div>
      <div className={styles.container}>
        <Badge color="primary" style={{ fontSize: 19 }}>
          Click Buttons To Retrive Stocks Information from Dow Jones or Nasdaq
          stock market:
        </Badge>
        {index === "dowjones_constituent" && (
          <Buttons
            color="primary"
            outline={true}
            text="Show Nasdaq 100 Stocks"
            onClick={() => {
              setIndex(`nasdaq_constituent`);
              setSelect("");
            }}
          />
        )}

        {(index === "nasdaq_constituent" || index === "") && (
          <Buttons
            color="success"
            outline={true}
            text="Show Dow Jones Stocks"
            onClick={() => {
              setIndex(`dowjones_constituent`);
              setSelect("");
            }}
          />
        )}
      </div>

      <div>
        <div className={styles.searchStyle}>
          <input
            style={{
              width: "30%",
              padding: "5px 5px",
              outline: 0,
              border: "1px #1E90FF solid",
              fontSize: "100%",
            }}
            type="search"
            placeholder="Quick Filter"
            onChange={handleQuickFilter}
          />

          <Select
            placeholder={"Select a Sector"}
            options={FormatedUniqueSelectOptions}
            isSearchable
            onChange={(e) => (e ? setSelect(e.value) : setSelect(""))}
            isClearable
            styles={{
              control: (css) => ({
                ...css,
                width: 330,
              }),
              option: (provided, state) => ({
                ...provided,
                width: "auto",
                color: state.isSelected ? "white" : "#03a1fc",
              }),
            }}
          />
          <h6>
            More details by double clicking your chosen stock in the table
          </h6>
        </div>
        <div
          className="ag-theme-balham"
          style={{
            height: "500px",
            width: "100%",
          }}
        >
          <AgGridReact
            onGridReady={onGridReady}
            columnDefs={props.columnDefs}
            rowData={props.rowData}
            pagination={props.pagination}
            paginationPageSize={props.pages}
            defaultColDef={props.defaultColDef}
            rowSelection={props.rowSelection}
            onRowDoubleClicked={doubleClickHandler}
            animateRows={props.animateRows}
          />
        </div>
      </div>
    </div>
  );
}

export default StocksTable;
