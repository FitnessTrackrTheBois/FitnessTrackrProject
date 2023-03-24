import {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";


const Profile = (props) =>{
    const { setLoggedIn, routines, setRoutines, activities, setActivities } = props;

    const [createRoutButton, setCreateRoutButton] = useState(false);
    const [createActButton, setCreateActButton] = useState(false);

    const [createRoutName, setCreateRoutName ] = useState("");
    const [createRoutGoal, setCreateRoutGoal ] = useState("");
    const [createRoutPublic, setCreateRoutPublic] = useState("");

    const [createActName, setCreateActName ] = useState("");
    const [createActDesc, setCreateActDesc ] = useState("");


// toggle Create Routine form (button) 
    function toggleCreateRoutineForm() {
        setCreateRoutButton(!createRoutButton)
    };

// toggle Create Activity form (button) 
    function toggleCreateActivityForm() {
        setCreateActButton(!createActButton)
    };

    const nav = useNavigate();

// Auth Check
    useEffect(()=> {
        if (localStorage.getItem("token")){
            setLoggedIn(true);
            console.log("Logged In");
        } else {
            setLoggedIn(false);
            console.log("No Token Exists");
        };
    }, []);

// Create Routine
    const createRoutine = async (event) => {
        event.preventDefault();

        const tokenKey = localStorage.getItem("token");

        try {
            const response = await fetch(`https://fitnesstrac-kr.herokuapp.com/api/routines`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenKey}`
                },
                body: JSON.stringify({
                        name: createRoutName,
                        goal: createRoutGoal,
                        isPublic: createRoutPublic
                })
            });
            const transData = await response.json();
                console.log(transData);

            if (!transData){
                alert("Routine was not created. Please try again. ");
            } else {
//spread op (clone) + new routine 
                setRoutines([...routines, transData]);
                alert("Routine was successfully created.");
// reset form
                setCreateRoutButton(false);
                setCreateRoutName("");
                setCreateRoutGoal("");
                setCreateRoutPublic("");
                nav("/")
            }
        } catch (error){
            console.log(error);
        }
    };

// Create Activity
    const createActivity = async (event) => {
        event.preventDefault();

        const tokenKey = localStorage.getItem("token");

        try {
            const response = await fetch(`https://fitnesstrac-kr.herokuapp.com/api/activities`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                        name: createActName,
                        description: createActDesc
                })
            });
            const transData = await response.json();
                console.log(transData);

            if (!transData){
                alert("Activity was not created. Please try again. ");
            } else {
    //spread op (clone) + new routine 
                setActivities([...activities, transData]);
                alert("Activity was successfully created.");
    // reset form
                setCreateActButton(false);
                setCreateActName("");
                setCreateActDesc("");
                nav("/")
            }
        } catch (error){
            console.log(error);
        }
    };

    return(
        <div className='Profile'>
            
            <div>My Profile</div>
            <div>
                <button onClick={ toggleCreateRoutineForm }>Create New Routine</button>
                {
                    createRoutButton ? (
                        <form onSubmit={ createRoutine } className='createForm'>
                            <input 
                                type="text"
                                value={ createRoutName }
                                onChange={(event)=>{
                                    setCreateRoutName(event.target.value);
                                }}
                                placeholder="Routine Name"
                            />
                            <textarea 
                                type="text"
                                value={ createRoutGoal } 
                                rows="4" 
                                cols="75"
                                placeholder="Routine Goal"
                                onChange={(event)=>{
                                    setCreateRoutGoal(event.target.value);
                                }}
                            />
                            <input 
                                type="text"
                                value={ createRoutPublic } 
                                onChange={(event)=>{
                                    setCreateRoutPublic(event.target.value);
                                }}
                                placeholder="Make Routine Public? Type ' True '(yes) or ' False '(no)"
                            />
                            <button type="submit">Submit</button>
                        </form>
                    ): ""
                } 
            </div>
            <div>
                <button onClick={ toggleCreateActivityForm }>Create New Activity</button>
                {
                    createActButton ? (
                        <form onSubmit={ createActivity } className='createForm'>
                            <input 
                                type="text"
                                value={ createActName }
                                onChange={(event)=>{
                                    setCreateActName(event.target.value);
                                }}
                                placeholder="Activity Name"
                            />
                            <textarea 
                                type="text"
                                value={ createActDesc } 
                                rows="4" 
                                cols="75"
                                placeholder="Activity Description"
                                onChange={(event)=>{
                                    setCreateActDesc(event.target.value);
                                }}
                            />
                            <button type="submit">Submit</button>
                        </form>
                    ): ""
                } 
            </div>
        </div>
    );
}


export default Profile;