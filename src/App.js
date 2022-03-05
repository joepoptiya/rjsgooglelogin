import GoogleLogin from "react-google-login";
import "./App.css";

function App() {
  const handleFailure = (response) => {
    alert(response);
  };

  const handleLogin = (response) => {
    console.log(response);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Google Login App</h1>
        <div>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Log in with Google"
            onSuccess={handleLogin}
            onFailure={handleFailure}
            cookiePolicy={"single_host_origin"}
          ></GoogleLogin>
        </div>
      </header>
    </div>
  );
}

export default App;
