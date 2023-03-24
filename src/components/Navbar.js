//COMPLETE
import { Link } from "react-router-dom";

const Navbar = (props) => {
    const { loggedIn } = props;

    return(
        <div className="NavLinks">
            <ul className="NavLinkBar">
            <li className="NavLinkItem">{ loggedIn ? <div></div> : <Link  to="/Register"> Register </Link> }</li>
            <li className="NavLinkItem">{ loggedIn ? <div></div> : <Link  to="/Login"> Login </Link> }</li>
            <li className="NavLinkItem"><Link  to="/"> Home </Link></li>
            <li className="NavLinkItem">{ !loggedIn ? <div></div> : <Link  to="/Profile"> Profile </Link> }</li>
            <li className="NavLinkItem">{ !loggedIn ? <div></div> : <Link  to="/Logout"> Logout </Link> }</li>
            </ul>
        </div>

    )
}

export default Navbar; 