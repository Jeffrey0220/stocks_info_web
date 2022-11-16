import Footer from "../components/Footer";
import HistoricalPriceCard from "../components/cards/HistoricalPriceCard";
import HistoricalPriceTable from "../components/tables/HistoricalPriceTable";
import { useLocation } from "react-router-dom";

function HistoricalPrice() {
  const location = useLocation();
  const data = location.state?.symbol;

  console.log(data);
  console.log(typeof data);
  return (
    <div>
      <div>
        <HistoricalPriceCard />
      </div>
      <HistoricalPriceTable symbol={data} />
      <Footer />
    </div>
  );
}

export default HistoricalPrice;
