import React from "react"
import { Link } from "react-router-dom";
import  './Login.css';

function Login() {
    return(
        <div className="Login">
        <header className="Login-header">
          <p>
          <div classname = "WebsiteName"><h2>Bruin</h2><h3>Hoops</h3></div>
          </p>
          <a>
        <img src = "https://content.sportslogos.net/logos/35/882/full/ucla_bruins_logo_mascot_20043890.png" className="Login-logo" alt="logo"/>
  <body>
    <div class = "login-Section">
      <meta name ="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <h1>Login</h1>
      <form>
        <label for ="username">Username</label>
        <input type = "text" id ="username" name = "password"></input>
        <label for="password">Password</label>
        <input type="password" id="password" name="password"></input>
        <input type="submit" value="Login"></input>
        <Link to="/Home">
              Create Account
        </Link>
      </form>
    </div>
  </body>
          </a>
        </header>
      </div>
    );
  };

export default Login;