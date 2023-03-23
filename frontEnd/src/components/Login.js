//COMPLETE

import { useState } from 'react';

const Login = () => {
  const [username, setLoginUser] = useState("");
  const [password, setLoginPass] = useState("");

  async function loginAccount(event) {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user: {
            username: username,
            password: password
          }
        })
      });

      const translation = await response.json();
      console.log(translation);

      if (!translation.success) {
        alert("Login Unsuccessful");
      } else {
        alert("Login Successful");
        const receivedToken = translation.data.receivedToken;
        localStorage.setItem("accountToken", receivedToken);
      }
    } catch (error) {
      console.log("An error has occurred:", error);
    }
  }

  return (
    <div>
      <form onSubmit={loginAccount}>
        <input type="text" placeholder="Username" value={username} onChange={(event) => setLoginUser(event.target.value)}></input>
        <input type="password" placeholder="Password" value={password} onChange={(event) => setLoginPass(event.target.value)}></input>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default Login;
