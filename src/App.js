import React, { useEffect, useState } from "react";
import "./App.css";
import Repo from "./component/Repo";
import Nav from "./component/Nav";
import Footer from "./component/Footer";
import RingLoader from "react-spinners/RingLoader";
// import { get } from "http";
import Issues from "./component/Issues";
import PaginationPack from "./component/Pagination";
// import { default as localIssues } from "./utils";
// import { closeissue, openissue } from "./utils";
// import { comments as localComments } from "./utils";
import LandingPage from "./component/LandingPage";
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
console.log("id", clientId);
function App() {
  const [token, setToken] = useState("");
  const [issues, setIssues] = useState([]);
  const [pageStatus, setPageStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [isClear, setIsClear] = useState(false);
  // const [openIssues, setOpenIssues] = useState([]);
  // const [closeIssues, setCloseIssues] = useState([]);
  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [currentOwner, setCurrentOwner] = useState("facebook");
  const [currentRepo, setCurrentRepo] = useState("react");
  const [issueNumber, setIssueNumber] = useState(null);
  const [search, setSearch] = useState("Top repo has more than 100000 stars.");
  const [isLanding, setIsLanding] = useState(false);
  const [landingData, setLandingData] = useState([]);

  const CurrentUser = async passedToken => {
    const url = `https://api.github.com/user?access_token=${passedToken}`;
    const response = await fetch(url);
    const data = await response.json();
    setCurrentUser(data);
  };

  const getAPI = async existingToken => {
    //Hai- made url a varible and insert existingToken as a dynamic varible
    const url = `https://api.github.com/repos/facebook/react/issues`;
    const headers = {
      Accept: "application / vnd.github.v3 + json",
      Authorization: `token ${existingToken.split("&")[0]}`
    };

    const response = await fetch(url, {
      method: "GET",
      headers: headers
    });

    const jsonData = await response.json();
    // const urls = response.headers.get("link").split(",").map(item=>item.split(";")[0].replace("<","").replace(">",""));
    // console.log(urls)
    console.log(response.headers.get("link"));
    const links =
      response.headers.get("link") &&
      response.headers
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

  const getAPIPagination = async (baseURL, tok) => {
    //Hai- made url a varible and insert existingToken as a dynamic varible
    const url = baseURL;
    const headers = {
      Accept: "application / vnd.github.v3 + json",
      Authorization: `token ${tok}`
    };

    const response = await fetch(baseURL, {
      method: "GET",
      headers: headers
    });

    const jsonData = await response.json();
    // const urls = response.headers.get("link").split(",").map(item=>item.split(";")[0].replace("<","").replace(">",""));
    // console.log(urls)
    const links =
      response.headers.get("link") &&
      response.headers
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
    console.log("json", jsonData);
    setPageStatus(links);
    setIssues(jsonData);
    setIsLoading(false);
  };

  const searchIssues = async event => {
    const headers = {
      Accept: "application / vnd.github.v3 + json"
    };
    event && event.preventDefault();
    const url = `https://api.github.com/search/issues?q=${query}?sort=created&order=desc?per_page=20`;
    const response = await fetch(url, {
      method: "GET",
      headers: headers
    });
    const data = await response.json();
    setIssues(data.items);

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

  const searchRepo = async (q, tok) => {
    const headers = {
      Accept: "application / vnd.github.v3 + json"
    };
    const url = `https://api.github.com/search/repositories?q=${q}&access_token=${tok}`;
    const response = await fetch(url, {
      method: "GET",
      headers: headers
    });
    const result = await response.json();
    setLandingData(result);
    if (result.total > 0) {
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
      const message = `You're searching for ${q}`;
      setSearch(message);
      setPageStatus(links);
    }
  };

  console.log("token", search);

  //function to get all the comments of the current Issue from api
  const getComments = async number => {
    if (number && token) {
      const response = await fetch(
        `https://api.github.com/repos/facebook/react/issues/${number}/comments?access_token=${token}`
      );
      const data = await response.json();
      setComments(data);
      // console.log("comments data", data);
      return data;
    } else console.log("there is no number passed in to getComments");
  }; //Hai - start using api


  const getLandingRepo = async tok => {
    const url = `https://api.github.com/search/repositories?q=stars:>=100000&fork:false?access_token=${tok}`;
    const response = await fetch(url);
    const data = await response.json();

    setLandingData(data);
  };

  const getRepoIssues = async (query, tok) => {
    const url = `https://api.github.com/repos/${query}/issues`;
    const headers = {
      Accept: "application / vnd.github.v3 + json",
      Authorization: `token ${tok.split("&")[0]}`
    };

    const response = await fetch(url, {
      method: "GET",
      headers: headers
    });

    const jsonData = await response.json();
    // const urls = response.headers.get("link").split(",").map(item=>item.split(";")[0].replace("<","").replace(">",""));
    // console.log(urls)
    console.log(response.headers.get("link"));
    const links =
      response.headers.get("link") &&
      response.headers
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
      // getAPI(accessToken);
      CurrentUser(accessToken);
    }

    if (existingToken) {
      setToken(existingToken.split("&")[0]);
      // getAPI(existingToken);
      getLandingRepo(existingToken.split("&")[0]);
      CurrentUser(existingToken);
    }
  }, []);

  useEffect(() => {
    //   getComments(currentIssue.number);
    // }, []);
    // console.log("pageStatus", pageStatus);

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
            <LandingPage
              landingData={landingData}
              searchRepo={searchRepo}
              token={token}
              getRepoIssues={getRepoIssues}
              search={search}
            />
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
              issues={issues}
              setIssues={setIssues}
              currentUser={currentUser}
              currentOwner={currentOwner}
              currentRepo={currentRepo}
              setQuery={setQuery}
              getAPI={getAPI}
              isClear={isClear}
              setIsClear={setIsClear}
              token={token}
            />
          )}
          <PaginationPack
            pageStatus={pageStatus && pageStatus}
            setIssues={setIssues}
            getAPIPagination={getAPIPagination}
            setIsLoading={setIsLoading}
            token={token}
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
              token={token}
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
