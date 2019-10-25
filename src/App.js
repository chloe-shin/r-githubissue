import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Repo from "./component/Repo";
import Nav from "./component/Nav";
import Footer from "./component/Footer";
import { get } from "http";
import {
  Container,
  Row,
  Card,
  Button,
  Col,
  FormControl,
  Form
} from "react-bootstrap";
import { default as localIssues } from "./utils/localIssues";

// require("dotenv").config({path: '.env'});
const clientId = process.env.REACT_APP_CLIENT_ID;
console.log("id", clientId);

function App() {
  const [token, setToken] = useState(null);
  const [issues, setIssues] = useState([]);
  const [query, setQuery] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  console.log(token);

  const getAPI = async tok => {
    const url = `https://api.github.com/repos/facebook/react/issues?access_token=${tok}&state=all`;
    const response = await fetch(url);
    const jsonData = await response.json();
    setIssues(jsonData);
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
  console.log("query", query);
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
      getAPI(existingToken);
    }
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
            onClick={() => setIsSearch(!false)}
          >
            Submit
          </Button>
          {isSearch && (
            <button onClick={() => getAPI()} className="clear-search">Clear current search query, filters, and sorts</button>
          )}
        </Form>
      </div>
      <Nav />
      <Repo issues={issues} />;
      <Footer />
    </>
  );
}

export default App;
