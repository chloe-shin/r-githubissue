import React, { useEffect, useState } from "react";
import "./App.css";
import Repo from "./component/Repo";
import Nav from "./component/Nav";
import Footer from "./component/Footer";
import RingLoader from "react-spinners/RingLoader";
// import { get } from "http";
import Issues from "./component/Issues";
import PaginationPack from "./component/Pagination";
import { default as localIssues } from "./utils";
import { closeissue, openissue } from "./utils";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = `css
  display: block;
  margin: 0 auto;
  border-color: rgb(54, 215, 183);
`;

// require("dotenv").config({path: '.env'});
const clientId = process.env.REACT_APP_CLIENT_ID;
// console.log("id", clientId);
function App() {
  const [token, setToken] = useState(null);
  const [issues, setIssues] = useState([]);
  const [pageStatus, setPageStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [isClear, setIsClear] = useState(false);
  const [openIssues, setOpenIssues] = useState([]);
  const [closeIssues, setCloseIssues] = useState([]);
  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [currentOwner, setCurrentOwner] = useState("facebook");
  const [currentRepo, setCurrentRepo] = useState("react");
  const [issueNumber, setIssueNumber] = useState(null);

  const CurrentUser = async passedToken => {
    const url = `https://api.github.com/user?access_token=${passedToken}`;
    const response = await fetch(url);
    const data = await response.json();
    setCurrentUser(data);
  };

  //this get called from line 167
  const getAPI = async existingToken => {
    //Hai- made url a varible and insert existingToken as a dynamic varible
    const url = `https://api.github.com/repos/facebook/react/issues?access_token=${existingToken}&state=all&per_page=20`;
    const headers = {
      Accept: "application / vnd.github.v3 + json"
    };

    const response = await fetch(url, {
      method: "GET",
      headers: headers
    });

    const jsonData = await response.json();
    // const urls = response.headers.get("link").split(",").map(item=>item.split(";")[0].replace("<","").replace(">",""));
    // console.log(urls)

    const links = response.headers
      .get("link")
      .split(",")
      .map(url => {
        return {
          link: url
            .split(";")[0]
            .replace("<", "")
            .replace(">", ""),
          value: url
            .split(";")[1]
            .trim()
            .replace('"', "")
            .replace('"', "")
        };
      });

    setPageStatus(links);
    setIssues(jsonData);
    setIsLoading(false);
  };

  const searchIssues = async event => {
    const headers = {
      Accept: "application / vnd.github.v3 + json"
      // Accept: "application/vnd.github.v3.text-match+json"
    };
    event && event.preventDefault();
    const url = `https://api.github.com/search/issues?q=${query}&order=desc?per_page=20`;
    const response = await fetch(url, {
      method: "GET",
      headers: headers
    });
    const data = await response.json();
    setIssues(data.items);
    setIsClear(!false);

    const links = response.headers
      .get("link")
      .split(",")
      .map(url => {
        return {
          link: url
            .split(";")[0]
            .replace("<", "")
            .replace(">", ""),
          value: url
            .split(";")[1]
            .trim()
            .replace('"', "")
            .replace('"', "")
        };
      });

    setPageStatus(links);
  };

  // function to get all the comments of the current Issue from api
  const getComments = async number => {
    if (number && token) {
      const response = await fetch(
        `https://api.github.com/repos/facebook/react/issues/${number}/comments?access_token=${token}`
      );
      const data = await response.json();
      setComments(data);
      console.log("comments data", data);
      return data;
    } else console.log("there is no number passed in to getComments");
  }; //Hai - start using api

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

    if (!accessToken && !existingToken) {
      window.location.replace(
        `https://github.com/login/oauth/authorize?scope=user:email,repo&client_id=${clientId}`
      );
    }

    if (accessToken) {
      // console.log(`New accessToken: ${accessToken}`);
      setToken(accessToken);
      sessionStorage.setItem("token", accessToken);
      getAPI(accessToken);
      CurrentUser(accessToken);
    }

    if (existingToken) {
      setToken(existingToken);
      getAPI(existingToken);
      CurrentUser(existingToken);
      getOpenIssues();
      getCloseIssues();
      console.log("exsistingtoken", existingToken);
    }
  }, []);

  useEffect(() => {
    //   getComments(currentIssue.number);
    // }, []);
    // console.log("pageStatus", pageStatus);
    console.log("running useEffect");
    getComments(issueNumber);
  }, [issueNumber]);

  // console.log('token state:', token)
  // console.log("pageStatus", pageStatus)
  return (
    <Router>
      {/* Search for issues (within Repo.js) */}
      <Nav currentOwner={currentOwner} currentRepo={currentRepo} />
      <Switch>
        <Route path="/" exact>
          <div>
            <h1>HOME PAGE</h1>
          </div>
        </Route>
        <Route exact path={`/:owner/:repo/issues`} exact>
          {isLoading ? (
            <div className="sweet-loading">
              <RingLoader
                css={override}
                sizeUnit={"px"}
                size={150}
                color={"rgb(54, 215, 183)"}
                loading={isLoading}
              />
            </div>
          ) : (
            <Repo
              query={query}
              closeIssues={closeIssues}
              openIssues={openIssues}
              issues={issues}
              setIssues={setIssues}
              currentUser={currentUser}
              // label={label}
              // getLabel={getLabel}
              currentOwner={currentOwner}
              currentRepo={currentRepo}
              setQuery={setQuery}
              getAPI={getAPI}
              isClear={isClear}
              setIsClear={setIsClear}
              searchIssues={searchIssues}
            />
          )}
          <PaginationPack
            pageStatus={pageStatus && pageStatus}
            setIssues={setIssues}
            getAPI={getAPI}
            setIsLoading={setIsLoading}
          />
          )}
        </Route>
        <Route
          exact
          path={`/:owner/:repo/issues/:number`}
          children={
            <Issues
              issues={issues}
              comments={comments}
              setIssueNumber={setIssueNumber}
              currentUser={currentUser}
            />
          }
        />
        <Route path="/">
          <div>404</div>
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
