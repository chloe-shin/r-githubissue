import React, { useEffect, useState } from "react";
import "./App.css";
import Repo from './component/Repo';
import Nav from './component/Nav';
import Issues from './component/Issues';
import Footer from './component/Footer';
import { get } from "http";
import moment from "moment";
import {default as localIssues} from './utils'
import {closeissue, openissue} from './utils'
import {comments as localComments} from './utils';

// let markdown = '';

// require("dotenv").config({path: '.env'});
const clientId = process.env.REACT_APP_CLIENT_ID;
console.log("id", clientId);


function App() {
  const [token, setToken] = useState(null);
  const [issues, setIssues] = useState([]);
  const [openIssues, setOpenIssues] = useState ([]);
  const [closeIssues, setCloseIssues] = useState ([]);
  const [currentIssue, setCurrentIssue] = useState({});
  const [comments, setComments] = useState([]);

  //function to get all the comments of the current Issue from api
  const getComments = async (number) => {
    // const response = await fetch(`https://api.github.com/repos/facebook/react/issues/${number}/comments`);
    // const data = await response.json();
    // data && setComments([...comments],data);
    localComments && setComments(localComments);
  }

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
    setCurrentIssue(localIssues[0]);
    return true;


  };
  useEffect(() => {
    const existingToken = sessionStorage.getItem("token");
    const accessToken =
      window.location.search.split("=")[0] === "?access_token"
        ? window.location.search.split("=")[1]
        : null;
    getAPI();

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

  // get comments content each time a currentIssue is set
  useEffect(() => {
    getComments(currentIssue.number)
  }, []);

  return (


    <>
    <Nav />
    <Repo 
    closeIssues= {closeIssues}
    openIssues= {openIssues}
    issues={issues}
    setIssues = {setIssues}/>
      {currentIssue ? <Issues
      issue={localIssues[0]}
      comments={comments}
      /> : <p>No Issue</p>}
      <Footer />
    </>
  );
}

export default App;
