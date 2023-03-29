import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./assets/Login";
import ClientProfileManagement from "./assets/ClientProfileManagement";
import FuelQuoteForm from "./assets/FuelQuoteForm";
import QuoteTable from "./assets/QuoteTable";

import Homepage from "./assets/Homepage";

import { Routes, Route, Navigate } from "react-router";
import ProtectedRoutes from "./assets/ProtectedRoutes";
import NavigationBar from "./assets/NavigationBar";



function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/fuelquoteform" element={<FuelQuoteForm />} />
          <Route path="/fuelquotehistory" element={<QuoteTable />} />
          <Route path="/clientinformation" element={<ClientProfileManagement />} />
        </Route>

      </Routes>
    </div>
  );
}

export default App;
