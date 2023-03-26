//COMPLETE
import { useEffect, useState} from 'react';
import { Link } from "react-router-dom";

const HomePage = (props) =>{

    const{routines, activities, setLoggedIn} = props;

// Auth Check
    useEffect(()=> {
        if (localStorage.getItem("token")){
            setLoggedIn(true);
        } else {
            props.setLoggedIn(false);
            console.log("No Token Exists");
        };
    }, [])

    return(
        <div className='Home'>
            <div>
                    {
                        props.loggedIn ? (
                <div className='HomeMain'>
                    <div className='HomeDisplaySection'>
                        <h3 id="myRoutinesTitle">Routines: </h3>
                        <div className='myRoutinesSection'>  
                            
                            {
                                routines.length ? routines.map((oneRoutine)=>{
                                    return(
                                        <div key={oneRoutine.id} className='myRoutines'>
                                            <div className="routinesLink">
                                                Name: <Link to={`/${routines.id}`}> { oneRoutine.name }</Link>
                                                
                                            </div>
                                            <div>
                                                Goal: { oneRoutine.goal }
                                            </div>
                                            
                                        </div>
                                    )
                                })
                                : <div>No Data Available</div>
                            }
                        </div> 
                        <h3 id="myActivitiesTitle">Activities: </h3>
                        <div className='myActivitiesSection'>  
                            {
                                activities.length ? activities.map((oneActivity)=>{
                                    return(
                                        <section key={oneActivity.id} className='myActivities'>
                                            <div>Name: { oneActivity.name }</div>
                                            <div>Description: { oneActivity.description }</div>
                                            <div className="activitiesLink">
                                                Link: 
                                                <Link to={`/${oneActivity.id}`}>{ oneActivity.name } </Link>
                                            </div>
                                        </section>
                                    )
                                }): <div>No Data Available</div>
                            } 
                        </div>
                    </div> 
                </div>
                ): 
                <div>
                    <h2>Please register or login if you would like to create a new routine or activity.</h2>
                    <p>This site is dedicated to tracking your fitness goals.</p>
                    <p>You do not need an account to browse routines or activities. </p>
                </div>
                }
            </div>
        </div>
    )
}

export default HomePage;