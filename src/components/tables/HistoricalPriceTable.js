import React, { useState } from "react";
import styles from "./HistoricalPriceTable.module.css";
import { AgGridReact } from "ag-grid-react";
import useHistoricalPriceApi from "../../apis/HistoricalPriceApi";
import { Badge } from "reactstrap";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import LineChart from "../LineChart";
import Buttons from "../Buttons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

function CompanyTable(props) {
  //useSate for picking a date
  const [startDate, setStartDate] = useState(null);

  //useSate for getting symbol from double clicking table of Company page
  const [search, setSearch] = useState(props.symbol);

  //useState for fetching data from api
  const { loading, historicalPrice, error } = useHistoricalPriceApi(search);
  let navigate = useNavigate();
  const clikeHandler = () => {
    navigate("/stocks");
  };

  //format data datepicker
  const DateOptions = historicalPrice.map((option) => option.date);

  const maxDate = DateOptions[0];
  const minDate = DateOptions.pop();
  //for check the result of fomating
  console.log(maxDate);
  console.log(minDate);
  console.log(typeof maxDate);
  console.log(typeof startDate);

  console.log(historicalPrice);

  //format data according if users pick a date or not
  let rowDatas = [];
  const labelsData = [];
  const closeingPrice = [];
  rowDatas = historicalPrice;
  if (startDate === null) {
    for (let i = 0; i < rowDatas.length; i++) {
      labelsData.push(rowDatas[i].date);
    }
    console.log(labelsData);

    for (let j = 0; j < rowDatas.length; j++) {
      closeingPrice.push(rowDatas[j].close);
    }
    console.log(closeingPrice);
  } else {
    const startDateStr = JSON.stringify(startDate).substring(1, 11);

    console.log(startDateStr);

    rowDatas = historicalPrice.filter(
      (historicalPrice) => historicalPrice.date > startDateStr
    );
    console.log(rowDatas);
    for (let i = 0; i < rowDatas.length; i++) {
      labelsData.push(rowDatas[i].date);
    }
    console.log(labelsData);

    for (let j = 0; j < rowDatas.length; j++) {
      closeingPrice.push(rowDatas[j].close);
    }
    console.log(closeingPrice);
  }
  console.log(typeof historicalPrice);

  //setup data and porps for ag-grid table
  const tableProps = {
    rowData: rowDatas,
    columnDefs: [
      { headerName: "Date", field: "date", sortable: true, filter: true },
      { headerName: "Open", field: "open" },
      { headerName: "High", field: "high" },
      { headerName: "Low", field: "low" },
      { headerName: "Close", field: "close" },
      { headerName: "Volume", field: "volume" },
    ],

    pagination: true,
    pages: 15,
    height: "500px",
    width: "100%",
  };

  //setup data for line chart
  var data = {
    labels: labelsData,
    datasets: [
      {
        label: "Colsing Price",

        data: closeingPrice,
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(75, 192, 192)"],
        borderWidth: 3,
      },
    ],
  };

  //setup features for line chart
  var options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        reverse: true,
      },
    },
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  };

  const height = 400;

  //return of different conditions
  if (loading) {
    return <p>loading...</p>;
  }
  if (error) {
    return <p>Someting went wrong: {error.message}</p>;
  }

  return (
    <div>
      <div className={styles.container}>
        {search && (
          <Badge color="success" style={{ fontSize: 16 }}>
            {search} past {rowDatas.length} days historical prices
          </Badge>
        )}
        <div className={styles.datepicker}>
          {search && (
            <DatePicker
              selected={startDate}
              onChange={(date) =>
                data ? setStartDate(date) : setStartDate(null)
              }
              dateFormat="yyyy-MM-dd"
              maxDate={new Date(maxDate)}
              minDate={new Date(minDate)}
              placeholderText="Select a start Date"
              isClearable
              showYearDropdown
              scrollableYearDropdown
              wrapperClassName={styles.datePicker}
              calendarClassName={styles.calendar}
            />
          )}
        </div>
        <Buttons
          color="primary"
          outline={true}
          text="Choose a stock"
          onClick={clikeHandler}
        />
      </div>
      {search && (
        <div
          className="ag-theme-balham"
          style={{
            height: "500px",
            width: "100%",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <AgGridReact
            columnDefs={tableProps.columnDefs}
            rowData={tableProps.rowData}
            pagination={tableProps.pagination}
            paginationPageSize={tableProps.pages}
            defaultColDef={tableProps.defaultColDef}
          />
        </div>
      )}

      <div>
        {search && <LineChart data={data} height={height} options={options} />}
      </div>
    </div>
  );
}

export default CompanyTable;
