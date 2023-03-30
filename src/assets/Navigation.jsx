import '../css/Navigation.css'

import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <div className="navBar">
      <Link className="navItem" to="/">Home</Link>
      <Link className="navItem" to="/fuelquoteform">Fuel Quote Form</Link>
      <Link className="navItem" to="/fuelquotehistory">Fuel Quote History</Link>
      <Link className="navItem" to="/clientinformation">Client Profile Management</Link>
    </div>
  );
}
