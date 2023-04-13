import "../css/Homepage.css";
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom"
import { token } from "../assets/Login.jsx";

import hasClientInformation from "./hasClientInformation";

export default function Homepage() {
  const [clientInformation, setClientInformation] = useState(null)
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    //function call to check if the user has clientinformation in the database
    const checkClientInformation = async () => {
      try {
        const data = await hasClientInformation(token);
        setClientInformation(data)
        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    }

    checkClientInformation()
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
      <h1>Home page</h1>
    </div>
  );
}
