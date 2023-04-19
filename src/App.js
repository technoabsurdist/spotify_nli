import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Auth from "./Auth";
import Callback from "./Callback";
import Main from "./Main"; // Move the existing App content to a new Main component

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("spotifyAccessToken");
    if (accessToken) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      {isAuthenticated ? (
        <Main />
      ) : (
        <>
          <Route exact path="/" component={Auth} />
          <Route path="/callback" component={Callback} />
        </>
      )}
    </Router>
  );
}

export default App;