import React, { useEffect,useState } from "react";
import logo from "./logo.svg";
import "./App.css";

// require("dotenv").config({path: '.env'});
const clientId = process.env.REACT_APP_CLIENT_ID;
console.log("id", clientId)
function App() {
  const [token, setToken] = useState(null);
  const [issues, setIssues] = useState([]);

  const getIssues = async() => {
    const response = await fetch (`https://api.github.com/repos/facebook/react/issues`)
    const data = await response.json()
    setIssues(data)
    console.log ('issues', issues)
  }

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
      setToken(existingToken)
      console.log ('token', token)
    }
    getIssues()
  }, []);

  // const htmlIssues = issues.map(el => {
  //   return <h1>{el.title}</h1>
  // })

  // console.log({htmlIssues})

  return (
    <div className = "App">
    <div className = "IssueTitle">
    <h3>Issue Title</h3> 
      {issues.map(el => {
        return  <li>{el.title}</li> 
      })}

    </div>
    </div>
  )
}

export default App;
