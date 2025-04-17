import React from "react";
import RegisterForm from "../registerform";

function Signup({ goBack }) {
  return (
    <div>
      <RegisterForm register_url={"http://localhost:8083/api/users/"} />
      <button onClick={goBack}>back</button>
    </div>
  );
}

export default Signup;
