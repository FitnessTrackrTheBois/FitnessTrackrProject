//COMPLETE
import { Link } from "react-router-dom";

const Navbar = (props) => {
    const { loggedIn } = props;

    return(
        <div className="container">
            <div className="NavLinks">
            <div className="LinkIndividual">{ loggedIn ? <div></div> : <Link  to="/Register"> Register </Link> }</div>
            <div className="LinkIndividual">{ loggedIn ? <div></div> : <Link  to="/Login"> Login </Link> }</div>
            <div className="LinkIndividual"><Link  to="/"> Home </Link></div>
            <div className="LinkIndividual"> { !loggedIn ? <div></div> : <Link  to="/Profile"> Profile </Link> }</div>
            <div className="LinkIndividual">{ !loggedIn ? <div></div> : <Link  to="/Logout"> Logout </Link> }</div>
            </div>
        </div>

    )
}

export default Navbar; 