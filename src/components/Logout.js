//COMPLETE
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Logout = (props) => {

    const nav = useNavigate();

    useEffect(()=> {
                if (props.setLoggedIn(true)){
                    localStorage.removeItem("token");
                    nav("/");
                } else {
                    props.setLoggedIn(false);
                    console.log("No Token Exists");
                };
    }, [])

    return(
        <div></div>
    )
}

export default Logout; 