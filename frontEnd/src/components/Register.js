import { useState } from 'react';

const Registration = () => {
  const [newUsername, setUsername] = useState("");
  const [newPassword, setPassword] = useState("");

  async function registerNewAccount(event) {
    event.preventDefault();

    try {
      if (newPassword.length < 6) {
        alert("Your password needs to be at least 6 characters");
        return;
      } else if (newUsername.length < 6) {
        alert("Your username needs to be at least 6 characters");
        return;
      }

      const response = await fetch('http://localhost:3000/api/users/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user: {
            username: newUsername,
            password: newPassword
          }
        })
      });

      const translation = await response.json();
      console.log(translation);

      if (!translation.success) {
        alert("Account Creation Unsuccessful");
      } else {
        const webToken = translation.data.webToken;
        localStorage.setItem("accountToken", webToken);
      }
    } catch (error) {
      console.log("Error has occurred:", error);
    }
  }

  return (
    <div>
      <form onSubmit={registerNewAccount}>
        <input type="text" placeholder="Username" value={newUsername} onChange={(event) => setUsername(event.target.value)}></input>
        <input type="text" placeholder="Password" value={newPassword} onChange={(event) => setPassword(event.target.value)}></input>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default Registration;
