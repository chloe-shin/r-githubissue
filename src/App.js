import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Repo from "./component/Repo";
import Nav from "./component/Nav";
import Footer from "./component/Footer";
import { get } from "http";
import Issues from "./component/Issues";
import PaginationPack from "./component/Pagination";

// require("dotenv").config({path: '.env'});
const clientId = process.env.REACT_APP_CLIENT_ID;
// console.log("id", clientId);
function App() {
  const [token, setToken] = useState(null);
  const [issues, setIssues] = useState([]);
  const [pageStatus, setPageStatus] = useState(null);

  const getAPI = async (
    url = `https://api.github.com/repos/facebook/react/issues?access_token=73098386f1f5fbd159b090711b39ab2889842362&state=all`
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
    console.log("links", links);
    setIssues(jsonData);
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
      <Repo issues={issues} />
      <PaginationPack
        pageStatus={pageStatus && pageStatus}
        setIssues={setIssues}
        getAPI={getAPI}
      />
      {/* <Issues issues={issues} id={510496674} /> */}
      <Footer />
    </>
  );
}

export default App;
