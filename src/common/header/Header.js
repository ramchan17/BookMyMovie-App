import { Button, Tab, Tabs, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import Modal from "react-modal";
import LoginForm from "../forms/LoginForm";
import RegisterForm from "../forms/RegisterForm";

function Header(props) {
  const [showModal, setShowModal] = useState(false);
  const [value, setValue] = useState("login");
  const [loginStatus, setLoginStatus] = useState(false);
  const { history } = props;

  useEffect(() => {
    if (localStorage.getItem("current-user")) {
      setLoginStatus(true);
    }
  }, []);

  const path = window.location.pathname;

  const login = (username, password) => {
    const name = localStorage.getItem(username);
    if (name === null) {
      return;
    }
    if (localStorage.getItem(username) === password) {
      localStorage.setItem("current-user", username);
      setLoginStatus(true);
      setShowModal(false);
    }
  };

  const registerUser = (username, password) => {
    console.log(username);
    console.log(password);
    localStorage.setItem("current-user", username);
    localStorage.setItem(username, password);
    setLoginStatus(true);
    setShowModal(false);
  };

  const logout = () => {
    localStorage.removeItem("current-user");
    setLoginStatus(false);
  };

  function TabContainer(p) {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {p.children}
      </Typography>
    );
  }

  const handleChange = (event, value) => {
    console.log(value);
    setValue(value);
  };

  const myModal = (
    <Modal
      isOpen={showModal}
      className="Modal"
      overlayClassName="Overlay"
      onRequestClose={() => {
        setShowModal(false);
      }}
    >
      <Tabs value={value} onChange={handleChange}>
        <Tab label="LOGIN" value="login" />
        <Tab label="REGISTER" value="register" />
      </Tabs>
      {value === "login" && (
        <TabContainer>
          <LoginForm login={login} />
        </TabContainer>
      )}
      {value === "register" && (
        <TabContainer>
          <RegisterForm register={registerUser} />
        </TabContainer>
      )}
    </Modal>
  );

  return (
    <div className="main-header">
      <img
        src={logo}
        alt="logo"
        className="logo"
        onClick={() => {
          if (history) history.push("/");
        }}
      ></img>
      <div>
        <div className="bookshow-button">
          {path !== "/" && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                if (!loginStatus) {
                  setShowModal(true);
                  return;
                }
                // console.log(props);
                history.push("/bookshow/" + props.id);
              }}
            >
              BOOK SHOW
            </Button>
          )}
        </div>
        <Button
          variant="contained"
          onClick={() => (loginStatus ? logout() : setShowModal(true))}
        >
          {loginStatus ? "Logout" : "Login"}
        </Button>
      </div>
      {myModal}
    </div>
  );
}

export default Header;
