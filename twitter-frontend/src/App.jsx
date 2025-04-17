import "./App.css";
import Public from "./components/public";
import { useAuth } from "./context/AuthContext";
import Private from "./components/private";

function App() {
  const { isLoggedIn } = useAuth();
  const { setIsLoggedIn } = useAuth();
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
    </>
  );
}

export default App;
