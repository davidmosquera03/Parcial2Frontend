import React from "react"


function Signup ({goBack}) {
  return (
    <div>
      <p>You are registering</p>

      <button onClick={goBack}>back</button>
    </div>
  )
};

export default Signup;
