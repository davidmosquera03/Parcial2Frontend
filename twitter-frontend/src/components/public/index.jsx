import React from "react";
import Login from "./login";
import Signup from "./signup";

import { useState } from "react";

const Public = (props) => {
  const [view, setView] = useState("main");

  return (
    <div>
      {view === "main" && (
        <>
          <p>Login</p>
          <button onClick={() => setView("login")}>Log in</button>
          <p>Sign up</p>
          <button onClick={() => setView("signup")}>Sign up</button>
        </>
      )}

      {view === "login" && <Login goBack={() => setView("main")} />}
      {view === "signup" && <Signup goBack={() => setView("main")} />}
      {view === "portal" && (
        <>
          <p>portal</p>
        </>
      )}
    </div>
  );
};

export default Public;
