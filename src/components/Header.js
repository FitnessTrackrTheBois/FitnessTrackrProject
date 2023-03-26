import { Link } from "react-router-dom";
import { Navbar } from "../components";

const Header = ({ loggedIn }) => {
  return (
    <div className="Header">
      <Link to="/">
        <div className="Title">Fitness Tracker</div>
      </Link>
      <Navbar loggedIn={loggedIn} />
    </div>
  );
};

export default Header;