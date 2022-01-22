import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

//onHeader the server address and the client address will be the same so when you request the server you are in the / path dont use https://serverAddress
// in localy the server is in 8080 somehting like http://localhost:8080
function App() {
  async function fetchData() {
    const response = await fetch("http://localhost:8080/users");
    const data = await response.json();

    console.log(data);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <button onClick={fetchData}>Click</button>
    </div>
  );
}

export default App;
