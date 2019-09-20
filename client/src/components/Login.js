import React, {useState, useEffect} from "react";
import {axiosWithAuth} from './AxiosAuth';
import { Button , Input } from "semantic-ui-react";

const Login = (props) => {
  const [creds, setCreds] = useState({
    username: "",
    password: ""
  })

  const submitHandler = e =>{
    e.preventDefault();
    
    axiosWithAuth()
    .post('/login', creds)
    .then(res=>{
      console.log(res);
      localStorage.setItem("token", res.data.payload);
      props.history.push('/bubbles');
    })
    .catch(error=>{
      console.log(error);
    });

  };
  const changeHandler = e =>{
    setCreds({
      ...creds,
      [e.target.name] : e.target.value
    });

  };
  return (
    <>
     <form onSubmit={submitHandler} className="user-info">
        <Input
          placeholder="Username"
          name="username"
          value={creds.username}
          onChange={changeHandler}
        />
        <Input
          type="password"
          placeholder="Password"
          name="password"
          value={creds.password}
          onChange={changeHandler}
        />
        <Button>Log In</Button>
      </form>
    </>
  );
};


export default Login;
