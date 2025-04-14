import React from "react"


function Login ({goBack}) {
  return (
    <div>
      <p>Your are logging in</p>
      <button onClick={goBack}>back</button>
    </div>
  )
};

export default Login;
