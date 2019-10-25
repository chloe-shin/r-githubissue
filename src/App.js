import React, { useEffect, useState } from "react";
import "./App.css";
import Repo from './component/Repo';
import Nav from './component/Nav';
import Issues from './component/Issues';
import Footer from './component/Footer';
import { get } from "http";
import {default as localIssues} from './utils';
import {comments as localComments} from './utils';


let markdown = '';

// require("dotenv").config({path: '.env'});
const clientId = process.env.REACT_APP_CLIENT_ID;

function App() {
  const [token, setToken] = useState(null);
  const [issues, setIssues] = useState([]);
  const [currentIssue, setCurrentIssue] = useState({});
  const [comments, setComments] = useState([]);

  //function to get all the comments of the current Issue from api
  const getComments = async (number) => {
    // const response = await fetch(`https://api.github.com/repos/facebook/react/issues/${number}/comments`);
    // const data = await response.json();
    // data && setComments([...comments],data);
    localComments && setComments(localComments);
  }

  const getAPI = async () => {
    
    // const url = `https://api.github.com/repos/facebook/react/issues?per_page=20&access_token=d4af6f6c04b268c44fb9157d50c721a1c09c3f43&scope`;
    // const response = await fetch(url);

    // const jsonData = await response.json();

    // console.table(jsonData);
    // setIssues(jsonData);
    // setCurrentIssue(jsonData.find(issue => issue.number == 17170));

    setIssues(localIssues)
    setCurrentIssue(localIssues[0]);
    return true;
  };
  // console.log(issues);
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

      sessionStorage.setItem("token", accessToken);
    }

    if (existingToken) {
      setToken(existingToken);
      getAPI();

      console.log(existingToken)
    }
    
    
  }, []);

  // get comments content each time a currentIssue is set
  useEffect(() => {
    getComments(currentIssue.number)
  }, []);

  return (
    <>
      {/* <Nav />
      <Repo issues={issues}/>
      <Footer /> */}
      {currentIssue ? <Issues
      issue={localIssues[0]}
      comments={comments}
      /> : <p>No Issue</p>}
    </>
  );
}

export default App;
