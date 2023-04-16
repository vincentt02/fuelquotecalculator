import "../css/Homepage.css";
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom"
import { token } from "../assets/Login.jsx";

import hasClientInformation from "./hasClientInformation";

export default function Homepage() {
  const [clientInformationData, setClientInformationData] = useState(null);
  const [clientInformation, setClientInformation] = useState(null);
  const [loading, setLoading] = useState(true);
  

  const navigate = useNavigate();

  useEffect(() => {
    //function call to check if the user has clientinformation in the database
    const checkClientInformation = async () => {
      try {
        const data = await hasClientInformation(token);
        setClientInformation(data)
      } catch (error) {
        console.error(error)
      }
    }

    const getClientInformation = async () => {
        try {
          const response = await fetch("/api/getClientInformation", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: token }),
          });
          if (response.status === 200) {
            const data = await response.json();
            // console.log(data)
            setClientInformationData(data)
            setLoading(false)
          } else {

          }
        } catch (error) {
          console.log(error.error);
        }
      };

    checkClientInformation()
    getClientInformation()
  }, [])

  //Redirect the user to the client profile management form if no clientinformation is found
  useEffect(() => {
    if(clientInformation === false)
    {
      navigate("/clientinformation")
    }
  
  }, [clientInformation, navigate])

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Homepage_container">
      <div className="welcome_container">Welcome, { clientInformationData.fullName }</div>
      <div className="clientInformation_display">
        <h3> Current Client Information</h3>
        <p>Full Name: { clientInformationData.fullName }</p>
        <p>Address 1: { clientInformationData.addressOne }</p>
        <p>Address 2: { clientInformationData.addressTwo }</p>
        <p>City: { clientInformationData.city }</p>
        <p>State: { clientInformationData.state }</p>
        <p>Zipcode: { clientInformationData.zipcode }</p>
      </div>
      
    </div>
  );
}
