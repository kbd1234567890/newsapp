import "./App.css";
import React, { useState } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import LoadingBar from "react-top-loading-bar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  let pageSize = 5;
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;

  const [progress, assignProgress] = useState(0);

  const setProgress = (progress) => {
    assignProgress(progress);
  }
    return (
      <div>
        <Router>
          <NavBar />
          <LoadingBar
            height = {3}
            color="#f11946"
            progress={progress}
    
          />
          <Routes>
            <Route
              path="/"
              element={
                <News apiKey = {apiKey} setProgress = {setProgress}
                  key="general"
                  pageSize={pageSize}
                  country="in"
                  category="general"
                />
              }
            />
            <Route
              path="/business"
              element={
                <News apiKey = {apiKey} setProgress = {setProgress}
                  key="business"
                  pageSize={pageSize}
                  country="in"
                  category="business"
                />
              }
            />
            <Route
              path="/sports"
              element={
                <News apiKey = {apiKey} setProgress = {setProgress}
                  key="sports"
                  pageSize={pageSize}
                  country="in"
                  category="sports"
                />
              }
            />
            <Route
              path="/entertainment"
              element={
                <News apiKey = {apiKey} setProgress = {setProgress}
                  key="entertainment"
                  pageSize={pageSize}
                  country="in"
                  category="entertainment"
                />
              }
            />
            <Route
              path="/science"
              element={
                <News apiKey = {apiKey} setProgress = {setProgress}
                  key="science"
                  pageSize={pageSize}
                  country="in"
                  category="science"
                />
              }
            />
            <Route
              path="/health"
              element={
                <News apiKey = {apiKey} setProgress = {setProgress}
                  key="health"
                  pageSize={pageSize}
                  country="in"
                  category="health"
                />
              }
            />
            <Route
              path="/technology"
              element={
                <News apiKey = {apiKey} setProgress = {setProgress}
                  key="technology"
                  pageSize={pageSize}
                  country="in"
                  category="technology"
                />
              }
            />
            <Route
              path="/general"
              element={
                <News apiKey = {apiKey} setProgress = {setProgress}
                  key="general"
                  pageSize={pageSize}
                  country="in"
                  category="general"
                />
              }
            />
          </Routes>
        </Router>
      </div>
    );
}

export default App;
