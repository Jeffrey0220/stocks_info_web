import React from "react";
import Footer from "../components/Footer";
import CompanyCard from "../components/cards/CompanyCard";
import CompanyTable from "../components/tables/CompanyTable";
import { useLocation } from "react-router-dom";

function Company() {
  const location = useLocation();

  const data = location.state?.symbol;

  console.log(data);
  console.log(typeof data);
  return (
    <div>
      <div>
        <CompanyCard />
      </div>
      <CompanyTable symbol={data} />

      <Footer />
    </div>
  );
}
export default Company;
