import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./assets/Login";
import ClientProfileManagement from "./assets/ClientProfileManagement";
import FuelQuoteForm from "./assets/FuelQuoteForm";
import QuoteTable from "./assets/QuoteTable";

function App() {
  return (
    <div className="App">
      <QuoteTable />
      <FuelQuoteForm />
      
      
    </div>
  );
}

export default App;