//COMPLETE
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const DATABASE_URL = 'http://localhost:3000/api/';
// const DATABASE_URL = 'https://fitnesstracker-optw.onrender.com/api';


const Login = () => {
    const [loginUser, setLoginUser] = useState("");
    const [loginPass, setLoginPass] = useState("");

    const nav = useNavigate();

    async function logIn(event){
        event.preventDefault();

        try {
            if(loginUser.length < 6){
                alert("User Name is too short. 6 Character Minimum")
                return;
            } else if (loginPass.length < 8){
                alert("Password is too short. 8 Character Minimum")
                return;
            };
            const response = await fetch(`${DATABASE_URL}/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    // user: {
                        username: loginUser,
                        password: loginPass
                    // }
                })
            });
            const transData = await response.json();

            if (!transData){
                alert("Login was unsuccessful. Please try again. ");
            } else {
                const tokenKey = transData.token;
                console.log(tokenKey);
                localStorage.setItem("token", tokenKey);
                alert("Login was successfully.");
    // reset form
                setLoginUser("")
                setLoginPass("")
                nav("/")
            }
        } catch(error){
            console.log(error)
        }
    }

    return(
        <div>
            <h2>Log Into Account</h2>
            <form onSubmit={ logIn }>
                <input 
                    type="text"
                    placeholder="Username"
                    onChange={(event)=> setLoginUser(event.target.value)}
                />
                <input 
                    type="text"
                    placeholder="Password"
                    onChange={(event)=> setLoginPass(event.target.value)}
                />
                <button type="submit" >Login</button>
            </form>
        </div>
    )
}

export default Login;
