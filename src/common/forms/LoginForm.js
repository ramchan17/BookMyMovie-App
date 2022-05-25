import { FormControl, Input, InputLabel, Button } from "@material-ui/core";
import React, { useState } from "react";
import "./Forms.css";

function LoginForm(props) {
  const [username, setUserName] = useState({
    val: "",
    error: false,
  });
  const [password, setPassword] = useState({
    val: "",
    error: false,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username.error || password.error) {
      return;
    }
    props.login(username.val, password.val);
  };

  const handleChange = (event) => {
    const fieldName = event.target.name;

    if (fieldName === "username") {
      const val = event.target.value;
      const error = event.target.value.length < 2;
      const newObj = { val, error };
      setUserName(newObj);
    } else {
      const val = event.target.value;
      const error = event.target.value.length < 6;
      const newObj = { val, error };
      setPassword(newObj);
    }
  };

  return (
    <form className="myForm" onSubmit={handleSubmit}>
      <FormControl>
        <InputLabel>Username</InputLabel>
        <Input
          name="username"
          value={username.val}
          error={username.error}
          onChange={handleChange}
        />
      </FormControl>
      <br />
      <FormControl>
        <InputLabel>Password</InputLabel>
        <Input
          name="password"
          type="password"
          value={password.val}
          error={password.error}
          onChange={handleChange}
        />
      </FormControl>
      <br />
      <br />
      <Button variant="contained" color="primary" type="submit">
        LOGIN
      </Button>
    </form>
  );
}

export default LoginForm;
