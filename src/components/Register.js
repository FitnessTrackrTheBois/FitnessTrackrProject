// Complete
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [newUser, setNewUser] = useState("");
  const [newPass, setNewPass] = useState(""); 

  const nav = useNavigate();

  async function registerUser(event) {
    event.preventDefault();

    try {
      if (newPass.length < 8) {
        alert("Your password needs to be at least 8 characters");
        return;
      } else if (newUser.length < 6) {
        alert("Your username needs to be at least 6 characters");
        return;
      }

      const response = await fetch('http://fitnesstrac-kr.herokuapp.com/api/users/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            username: newUser,
            password: newPass
          }
        })
      })

      const transData = await response.json();
      // console.log(translation);

      if (!transData.success) {
        alert("Account Creation Unsuccessful");
      } else {
          const tokenKey = transData.data.token;
          localStorage.setItem("token", tokenKey);
          alert("New Account was successfully created.");
//reset form 
          setNewUser("");
          setNewPass("");
          nav("/")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
        <h2>Create a New Account</h2>
        <form onSubmit={ registerUser }>
            <input 
                type="text"
                value={ newUser }
                placeholder="New Username"
                onChange={(event)=> setNewUser(event.target.value)}
            />
            <input 
                type="text"
                value={ newPass }
                placeholder="New Password"
                onChange={(event)=> setNewPass(event.target.value)}
            />
            <button type="submit" >Create Account</button>
        </form>
    </div>
  )
}

export default Registration;
