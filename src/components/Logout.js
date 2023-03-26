//COMPLETE
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Logout = ({ setLoggedIn }) => {
    const nav = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token") !== null) {
            localStorage.removeItem("token");
            setLoggedIn(false);
            nav("/");
        } else {
            console.log("No Token Exists");
        }
    }, [setLoggedIn, nav]);

    return <div></div>;
};

export default Logout;