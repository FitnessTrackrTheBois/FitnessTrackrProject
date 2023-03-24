//COMPLETE
import { Link } from "react-router-dom";

const Navbar = (props) => {
    const { loggedIn } = props;

    return(
        <div className="NavLinks">
            { loggedIn ? <div></div> : <Link to="/Register"> Register </Link> }
            { loggedIn ? <div></div> : <Link to="/Login"> Login </Link> }
            <Link to="/"> Home </Link>
            { !loggedIn ? <div></div> : <Link to="/Profile"> Profile </Link> }
            { !loggedIn ? <div></div> : <Link to="/Logout"> Logout </Link> }
        </div>
    )
}

export default Navbar; 