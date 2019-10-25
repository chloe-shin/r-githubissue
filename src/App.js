import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Repo from "./component/Repo";
import Nav from "./component/Nav";
import Footer from "./component/Footer";
import RingLoader from "react-spinners/RingLoader";
import { get } from "http";
import Issues from "./component/Issues";
import PaginationPack from "./component/Pagination";

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
    setIssues(jsonData);
    setIsLoading(false);
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
        <Repo issues={issues} />
      )}
      <PaginationPack
        pageStatus={pageStatus && pageStatus}
        setIssues={setIssues}
        getAPI={getAPI}
        setIsLoading={setIsLoading}
      />
      )}
      {/* <Issues issues={issues} id={510496674} /> */}
      <Footer />
    </>
  );
}

export default App;
