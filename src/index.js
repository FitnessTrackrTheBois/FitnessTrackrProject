import { createRoot } from "react-dom/client";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { HomePage, Register, Login, Profile, AddActivity, Header, Logout} from "./components";

const App =() => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [routines, setRoutines] = useState([]);
    const [activities, setActivities] = useState([]);

    async function fetchRoutines(){        
        try{
            const response = await fetch("https://fitnesstrac-kr.herokuapp.com/api/routines");
            const routineData = await response.json();
            setRoutines(routineData);
        } catch (error){
            console.log(error)
        }
    }

    async function fetchActivities(){        
        try{
            const response = await fetch("https://fitnesstrac-kr.herokuapp.com/api/activities");
            const activitiesData = await response.json();
            setActivities(activitiesData);
        } catch (error){
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchRoutines();
        fetchActivities();
        console.log("I was ran in SRC Index.js")
    }, [])

    return(
        <BrowserRouter>
            <Header loggedIn={ loggedIn } />
            <Routes>
                <Route path ="/" element={ <HomePage 
                    routines = { routines }
                    setRoutines = { setRoutines }
                    activities = { activities }
                    setActivities = { setActivities }
                    loggedIn = { loggedIn }
                    setLoggedIn = { setLoggedIn }
                /> }/>
                <Route path = "/Register" element={ <Register/>}/>
                <Route path = "/Login" element={ <Login/> }/>
                <Route path = "/Profile" element={ <Profile 
                    routines = { routines }
                    setRoutines = { setRoutines }
                    activities = { activities }
                    setActivities = { setActivities }
                    loggedIn = { loggedIn }
                    setLoggedIn = { setLoggedIn }
                /> }/>
                <Route path ="/Logout" element={ <Logout 
                    loggedIn={loggedIn} 
                    setLoggedIn={ setLoggedIn } 
                /> }/>
            </Routes>
        </BrowserRouter>
    )
}

createRoot(document.getElementById("app")).render(< App />)