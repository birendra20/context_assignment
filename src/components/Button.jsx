import React, { useState, useContext, useEffect, createContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";

const UserContext = createContext;

function Button() {
  const { isAuth, toggleAuth } = useContext(AuthContext);
  const [token, setToken] = useState("");

  useEffect(() => {
    if (isAuth) {
      return () => {
        setToken("");
      };
    } else {
      loginRequest();
    }
  }, [isAuth]);

  const loginRequest = () => {
    axios
      .post("https://reqres.in/api/login", {
        email: "eve.holt@reqres.in",
        password: "cityslicka"
      })
      .then((res) => {
        setToken(res.data.token);
      });
  };

  return (
    <button
      onClick={() => {
        toggleAuth(!isAuth, token);
      }}
    >
      {isAuth ? "logout" : "login"}
    </button>
  );
}

export default Button;
