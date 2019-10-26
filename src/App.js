import React, { useEffect, useState } from "react";
import "./App.css";
import Repo from "./component/Repo";
import Nav from "./component/Nav";
import Footer from "./component/Footer";
import RingLoader from "react-spinners/RingLoader";
import { get } from "http";
import Issues from "./component/Issues";
import PaginationPack from "./component/Pagination";
import { default as localIssues } from "./utils";
import { closeissue, openissue } from "./utils";
import { comments as localComments } from "./utils";
import { Form, FormControl, Button } from "react-bootstrap";



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
  const [currentIssue, setCurrentIssue] = useState({});
  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useState();

  const CurrentUser = async () => {
    const url = `https://api.github.com/user`;
    const response = await fetch(url);
    const data = await response.json();
    setCurrentUser(data);
  };

  // const postIssue = async (owner, repo, title, body) => {
  //   const url = `https://api.github.com/repos/${owner}/${repo}/issues`;
  //   const headers = {
  //     Accept: "application / vnd.github.v3 + json"
  //   };
  //   const response = await fetch(url, {
  //     method: "POST",
  //     headers: headers,
  //     body: {
  //       title: title,
  //       body: body
  //     }
  //   });
  // }
  // // postIssue("chloe-shin", "tictactoe", "my issue title", "my issue body");
 
  


  const getAPI = async (
    url = `https://api.github.com/repos/facebook/react/issues?access_token=&scope&state=all&per_page=10`
  ) => {
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
      getAPI();
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
  console.log("pageStatus", pageStatus)
  return (
    <div className="App">
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
            
          />
        )}
      <PaginationPack
        pageStatus={pageStatus && pageStatus}
        setIssues={setIssues}
        getAPI={getAPI}
        setIsLoading={setIsLoading}
      />
      )}
      {/* <Issues issues={issues} id={510496674} /> */}
      {currentIssue ? (
        <Issues issue={localIssues[0]} comments={comments} />
      ) : (
          <p>No Issue</p>
        )}
      <Footer />
    </div>
  );
}

export default App;
