import "./App.css";
import Public from "./components/public";
import { useAuth } from "./context/AuthContext";
import Private from "./components/private";
import { useState } from "react";
import { useGrowthBook } from "@growthbook/growthbook-react";

function App() {
  const { isLoggedIn } = useAuth();
  const { setIsLoggedIn } = useAuth();
  const growthbook = useGrowthBook(); // Access GrowthBook instance

  const isFeatureActive = growthbook.isOn("Boton"); // Check feature flag from GrowthBook

  return (
    <>
      <h2>Twitter</h2>

      {isLoggedIn ? <Private /> : <Public />}

      {isLoggedIn === true && (
        <>
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("name");
              setIsLoggedIn(false);
            }}
          >
            Log out
          </button>
          <p>Logged in</p>
        </>
      )}

      {isLoggedIn ? (
        <p>Welcome, {localStorage.getItem("name")}</p>
      ) : (
        <p>Please register and then log in to access Posts</p>
      )}

      {/* Feature flag experiment */}
      {isFeatureActive ? (
        <button onClick={() => alert("Feature Button Clicked!")}>New Feature Button</button>
      ) : (
        <a href="/feature-link">Feature Link</a>
      )}
    </>
  );
}

export default App;
