import { TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import "./login.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Email } from "@mui/icons-material";

const LogIn = () => {
  const [usersItems, setUsersItems] = useState([]);
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const getUsers = async () => {
    const response = await axios.get("/users");
    console.log(response.data);
    setUsersItems(response.data);
  };

  const checkUsers = (userName, userPassword) =>{
    for (var i = 0; i < usersItems.length; i++) {
      if (String(usersItems[i].id === userPassword) && usersItems[i].name === userName) {
          return true;
      }
    }
    return false;
  }

  const loginButtonClick = (event) => {
    event.preventDefault();
    setIsAuthorized(checkUsers(userName, userPassword));
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="container">
      <form className="form" onSubmit={loginButtonClick}>
        <Typography component="h1" align="center" variant="h5">
          Authorization
        </Typography>
        <TextField
          id="name"
          required
          label="Enter your name"
          variant="outlined"
          value={userName}
          onChange={e => setUserName(e.target.value)}
        />
        <TextField
          id="password"
          required
          label="Enter your password"
          variant="outlined"
          value={userPassword}
          onChange={e => setUserPassword(e.target.value)}
        />
        <Button type="submit" variant="contained">
          LogIn
        </Button>
        {isAuthorized && 
          <Typography component="h1" align="center" variant="h5">
          {userName}, you have authorized!
        </Typography>
        }
      </form>
      <div className="users">
        {usersItems.map((item) => {
          return (
            <div className="user-item" key={item.id}>
              login:{item.name}, password:{item.id}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LogIn;
