import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import queryString from "query-string";

const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
const redirectUri = process.env.REACT_APP_CALLBACK_URL;

const Callback = () => {
  const history = useHistory();

  useEffect(() => {
    const fetchTokens = async (code) => {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " + btoa(clientId + ":" + clientSecret),
        },
        body: `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(redirectUri)}`,
      });

      const data = await response.json();
      localStorage.setItem("spotifyAccessToken", data.access_token);
      localStorage.setItem("spotifyRefreshToken", data.refresh_token);
      history.push("/");
    };

    const parsed = queryString.parse(window.location.search);
    if (parsed.code) {
      fetchTokens(parsed.code);
    }
  }, [history]);

  return <div>Authenticating...</div>;
};

export default Callback;