import GoogleLogin from "react-google-login";
import { useState } from "react";
import "./App.css";

function App() {
  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );

  const handleFailure = (response) => {
    alert(response);
  };

  const handleLogin = async (response) => {
    const res = await fetch("/api/google-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: response.tokenId,
      }),
    });

    const data = await res.json();
    setLoginData(data);
    localStorage.setItem("loginData", JSON.stringify(data));
  };

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setLoginData(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Google Login App</h1>
        <div>
          {loginData ? (
            <div>
              <h2>Welcome {loginData.email}</h2>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Log in with Google"
              onSuccess={handleLogin}
              onFailure={handleFailure}
              cookiePolicy={"single_host_origin"}
            ></GoogleLogin>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
