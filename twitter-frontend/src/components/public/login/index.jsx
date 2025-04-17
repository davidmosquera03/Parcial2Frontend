import React from "react";
import LoginForm from "../loginform";
function Login({ goBack }) {
  return (
    <div>
      <p>Your are logging in</p>

      <LoginForm login_url={"http://localhost:8083/api/users/login"} />
      <br />
      <button onClick={goBack}>back</button>
    </div>
  );
}

export default Login;
