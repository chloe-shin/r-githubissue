import React, { useEffect,useState } from "react";
import logo from "./logo.svg";
import "./App.css";

// require("dotenv").config({path: '.env'});
const clientId = process.env.REACT_APP_CLIENT_ID;
console.log("id", clientId)
function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {


    const existingToken = sessionStorage.getItem("token");
    const accessToken =
      window.location.search.split("=")[0] === "?access_token"
        ? window.location.search.split("=")[1]
        : null;

    if (!accessToken && !existingToken) {
      window.location.replace(
        `https://github.com/login/oauth/authorize?scope=user:email,repo&client_id=${clientId}`
      );
    }

    if (accessToken) {
      console.log(`New accessToken: ${accessToken}`);

      sessionStorage.setItem("token", accessToken);

    }

    if (existingToken) {
      setToken(existingToken)
    }
  });

  return <div className="App">Hi there!</div>;
}

export default App;
