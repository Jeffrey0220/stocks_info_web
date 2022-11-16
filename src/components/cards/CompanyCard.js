import React from "react";
import Cards from "./Cards";

function CompanyCard() {
  const props = {
    color: "info",
    title: "Company",
    subtitle: "Information of Listed companies📝",
    text: "Through searching symbols to look up ditail information of listed companies. ",
  };
  return <Cards {...props} />;
}

export default CompanyCard;
