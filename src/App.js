import React, { useEffect, useState } from "react";
import "./App.css";

import Repo from "./component/Repo";
import Nav from "./component/Nav";
import Issues from "./component/Issues";
import Footer from "./component/Footer";
import Localissues from "./issues"
import { get } from "http";
import { default as localIssues } from "./utils";
import { closeissue, openissue } from "./utils";
import { comments as localComments } from "./utils";
import { Form, FormControl, Button } from "react-bootstrap";

// let markdown = '';

// require("dotenv").config({path: '.env'});
const clientId = process.env.REACT_APP_CLIENT_ID;
console.log("id", clientId);

function App() {
  const [token, setToken] = useState(null);
  const [issues, setIssues] = useState([]);
  const [query, setQuery] = useState("");
  const [isClear, setIsClear] = useState(false);
  const [openIssues, setOpenIssues] = useState([]);
  const [closeIssues, setCloseIssues] = useState([]);
  const [currentIssue, setCurrentIssue] = useState({});
  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  console.log(token);

  const CurrentUser =async()=>{
    const url = `https://api.github.com/user`
    const response = await fetch(url);
    const data = await response.json();
    setCurrentUser(data);
  }
  const getAPI = async tok => {
    const url = `https://api.github.com/repos/facebook/react/issues?access_token=${tok}&state=all`;
    const response = await fetch(url);
    const jsonData = await response.json();
    setIssues(jsonData);
    setCurrentIssue(localIssues);
  };

  const searchIssues = async event => {
    event && event.preventDefault();
    const url = `https://api.github.com/search/issues?q=${query}?sort=created&order=desc?per_page=20`;
    const response = await fetch(url);
    const data = await response.json();
    setIssues(data.items);
    console.log("url", url);
  };

  // console.log(issues);

  //function to get all the comments of the current Issue from api
  const getComments = async number => {
    // const response = await fetch(`https://api.github.com/repos/facebook/react/issues/${number}/comments`);
    // const data = await response.json();
    // data && setComments([...comments],data);
    localComments && setComments(localComments);
  };

  const getOpenIssues = async () => {
    // const url = `https://api.github.com/search/issues?q=repo:facebook/react+type:issue+state:open&per_page=20`;
    // const response = await fetch(url);
    // const openData = await response.json();
    // setOpenIssues(openData);
    // console.log ('open issues', openIssues)
    setOpenIssues(openissue);
  };

  const getCloseIssues = async () => {
    // const url = `https://api.github.com/search/issues?q=repo:facebook/react+type:issue+state:closed&per_page=20`;
    // const response = await fetch(url);
    // const closeData = await response.json();
    // setCloseIssues(closeData);
    // console.log ('cloased issues', closeIssues)
    setCloseIssues(closeissue);
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
      setToken(accessToken);
      sessionStorage.setItem("token", accessToken);
    }

    if (existingToken) {
      setToken(existingToken);
      getAPI(existingToken);
      CurrentUser();
      getOpenIssues();
      getCloseIssues();
      console.log("exsistingtoken", existingToken);
    }
  }, []);

  // get comments content each time a currentIssue is set
  useEffect(() => {
    getComments(currentIssue.number);
  }, []);

  return (
    <>
      <div>
        <Form
          inline
          onSubmit={event => searchIssues(event)}
          onChange={event => setQuery(event.target.value)}
        >
          <FormControl
            type="text"
            placeholder="is:issue is:open"
            className=" mr-sm-2"
          />
          <Button
            className="search-button"
            type="submit"
            onClick={() => setIsClear(!false)}
          >
            Submit
          </Button>
          {isClear && (
            <button onClick={() => getAPI()} className="clear-search">
              Clear current search query, filters, and sorts
            </button>
          )}
        </Form>
      </div>
      <Nav />

      <Repo
        closeIssues={closeIssues}
        openIssues={openIssues}
        issues={issues}
        setIssues={setIssues}
        currentUser={currentUser}
      />
      {currentIssue ? (
        <Issues issue={localIssues[0]} comments={comments} />
      ) : (
        <p>No Issue</p>
      )}
      <Footer />
    </>
  );
}

export default App;
