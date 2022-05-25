import { FormControl, InputLabel, Button, Input } from "@material-ui/core";
import React, { useState } from "react";
import "./Forms.css";

function RegisterForm(props) {
  const [firstName, setFirstName] = useState({
    val: "",
    error: false,
  });
  const [lastName, setLastName] = useState({
    val: "",
    error: false,
  });
  const [email, setEmail] = useState({
    val: "",
    error: false,
  });
  const [contact, setContact] = useState({
    val: "",
    error: false,
  });
  const [password, setPassword] = useState({
    val: "",
    error: false,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      firstName.error ||
      lastName.error ||
      email.error ||
      contact.error ||
      password.error
    )
      return;
    props.register(email.val, password.val);
  };

  const handleChange = (event) => {
    const fieldName = event.target.name;

    if (fieldName === "firstname") {
      const val = event.target.value;
      const error = event.target.value.length < 2;
      const newObj = { val, error };
      setFirstName(newObj);
    } else if (fieldName === "lastname") {
      const val = event.target.value;
      const error = event.target.value.length < 2;
      const newObj = { val, error };
      setLastName(newObj);
    } else if (fieldName === "email") {
      const val = event.target.value;
      const error =
        event.target.value.length < 6 || !event.target.value.includes("@");
      const newObj = { val, error };
      setEmail(newObj);
    } else if (fieldName === "password") {
      const val = event.target.value;
      const error = event.target.value.length < 6;
      const newObj = { val, error };
      setPassword(newObj);
    } else if (fieldName === "contact") {
      const val = event.target.value;
      const error = event.target.value.length < 8;
      const newObj = { val, error };
      setContact(newObj);
    }
  };

  return (
    <form className="myForm" onSubmit={handleSubmit}>
      <FormControl>
        <InputLabel>FirstName</InputLabel>
        <Input
          name="firstname"
          value={firstName.val}
          error={firstName.error}
          onChange={handleChange}
        />
      </FormControl>
      <br />
      <FormControl>
        <InputLabel>Lastname</InputLabel>
        <Input
          name="lastname"
          value={lastName.val}
          error={lastName.error}
          onChange={handleChange}
        />
      </FormControl>
      <br />
      <FormControl>
        <InputLabel>Email</InputLabel>
        <Input
          type="email"
          name="email"
          value={email.val}
          error={email.error}
          onChange={handleChange}
        />
      </FormControl>
      <br />
      <FormControl>
        <InputLabel>Password</InputLabel>
        <Input
          type="password"
          name="password"
          value={password.val}
          error={password.error}
          onChange={handleChange}
        />
      </FormControl>
      <br />
      <FormControl>
        <InputLabel>Contact Number</InputLabel>
        <Input
          type="number"
          name="contact"
          value={contact.val}
          error={contact.error}
          onChange={handleChange}
        />
      </FormControl>
      <br />
      <br />
      <Button variant="contained" color="primary" type="submit">
        REGISTER
      </Button>
    </form>
  );
}

export default RegisterForm;
