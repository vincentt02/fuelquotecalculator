import "../css/Homepage.css";
import { useState, useEffect } from "react";

import { Navigate } from "react-router-dom"
import { token } from "../assets/Login.jsx";

import hasClientInformation from "./hasClientInformation";

export default function Homepage() {

  const [clientInformation, setClientInformation] = useState(null)

  useEffect(() => {
    setClientInformation(hasClientInformation(token));
    console.log("test" , hasClientInformation(token))
  }, [])

  if(!clientInformation)
  {
    return (<Navigate to="/clientinformation" />)
    
  }

  return (
    <div className="Homepage_container">
      <h1>Home page</h1>
    </div>
  );
}
