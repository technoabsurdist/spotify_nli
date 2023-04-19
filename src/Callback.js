import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import queryString from "query-string";

const clientId = "d5af06ae3ae64a81a7a3bccbde8ff5be";
const clientSecret = "ef5dee66178645a988e3f2fcd373e427";
const redirectUri = "http://localhost:3000/callback";

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