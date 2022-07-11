import "./Login.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    console.log(userName);
    dispatch({
      type: "GET_USERNAME",
      payload: userName
    });
    setUserName("");
    navigate("/characters");
  };

  return (
    <div className="Login">
    <img  id="pokemonlogo" src="https://www.freeiconspng.com/uploads/pokemon-png-23.png" alt="aaa"/>
    <div id="Container">
      <h1></h1>
      <form id="form" action="" onSubmit={submit}>
        <input
        id="logininput"
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Your name.."
        />
        <button id="loginbutton">Submit</button>
      </form>
    </div>
    
        
      
          
        
        
    </div>
      
      
      
    
  );
};

export default Login;