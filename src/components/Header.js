//COMPLETE
import { Navbar } from "../components";

const Header = (props) => {
    const { loggedIn } = props;

    return(
        <div className="Header">
            <div>Fitness Tracker </div>
            <Navbar loggedIn={ loggedIn }/>
        </div>
    )
}

export default Header; 