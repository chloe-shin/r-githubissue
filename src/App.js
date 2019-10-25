import React, { useEffect, useState } from "react";
import "./App.css";
import Repo from './component/Repo';
import Nav from './component/Nav'
import Footer from './component/Footer'
import Localissues from "./issues"

// require("dotenv").config({path: '.env'});
const clientId = process.env.REACT_APP_CLIENT_ID;
console.log("id", clientId);
function App() {
  const [token, setToken] = useState(null);
  const [issues, setIssues] = useState([]);

  const getAPI = async () => {
    
    // const url = `https://api.github.com/repos/facebook/react/issues?per_page=20`;
    // const response = await fetch(url);

    // const jsonData = await response.json();

    // console.table(jsonData);
    setIssues(Localissues);
  };
  // console.log(issues);
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
      setToken(existingToken);
      getAPI();
    }
  }, []);

  return (
    <>
      <Nav />
      <Repo issues={issues}/>
      <Footer />
    </>
  );
}

export default App;
