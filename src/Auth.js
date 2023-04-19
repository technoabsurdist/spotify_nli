import React from "react";
import { useHistory } from "react-router-dom";
import "./Auth.css";

const clientId = "d5af06ae3ae64a81a7a3bccbde8ff5be";
const redirectUri = "http://localhost:3000/callback";
const scopes = "user-read-private user-read-email"; // Add more scopes as needed

const Auth = () => {
  const history = useHistory();

  const handleLogin = () => {
    const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(
      scopes
    )}&redirect_uri=${encodeURIComponent(redirectUri)}`;

    window.location.href = authUrl;
  };

  return (
    <div className="Auth">
      <h1>Spotify NLI</h1>
      <button onClick={handleLogin}>Log in with Spotify</button>
    </div>
  );
};

export default Auth;