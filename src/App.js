import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Repo from './component/Repo';
import Nav from './component/Nav'
import Footer from './component/Footer'
import { get } from "http";
import moment from "moment";
import {default as localIssues} from './utils'
import {closeissue, openissue} from './utils'



// require("dotenv").config({path: '.env'});
const clientId = process.env.REACT_APP_CLIENT_ID;
console.log("id", clientId);




function App() {
  const [token, setToken] = useState(null);
  const [issues, setIssues] = useState([]);
  const [openIssues, setOpenIssues] = useState ([]);
  const [closeIssues, setCloseIssues] = useState ([]);
 

  
  const getOpenIssues = async () => {
    // const url = `https://api.github.com/search/issues?q=repo:facebook/react+type:issue+state:open&per_page=20`;
    // const response = await fetch(url);
    // const openData = await response.json();
    // setOpenIssues(openData);
    // console.log ('open issues', openIssues)
    setOpenIssues(openissue)
  };

  const getCloseIssues = async () => {
    // const url = `https://api.github.com/search/issues?q=repo:facebook/react+type:issue+state:closed&per_page=20`;
    // const response = await fetch(url);
    // const closeData = await response.json();
    // setCloseIssues(closeData);
    // console.log ('cloased issues', closeIssues)
    setCloseIssues(closeissue)
  };

  const getAPI = async () => {
    // const url = `https://api.github.com/repos/facebook/react/issues?per_page=20&state=all`;
    // const response = await fetch(url);
    // const jsonData = await response.json();
    // setIssues(jsonData);
    // console.log(issues);
    setIssues(localIssues)
  };
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
      setToken(accessToken)
      sessionStorage.setItem("token", accessToken);
    }

    if (existingToken) {
      setToken(existingToken);
      getAPI();
      getOpenIssues();
      getCloseIssues();
      console.log ('exsistingtoken', existingToken)
    }
  }, []);

  return (
    <div className = "App">
      <Nav />
      <Repo 
      closeIssues= {closeIssues}
      openIssues= {openIssues}
      issues={issues}
      setIssues = {setIssues}/>
      <Footer />
    </div>
  );

}

export default App;
