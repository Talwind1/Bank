import "./App.css";

//onHeroku the server address and the client address will be the same so when you request the server you are in the / path dont use https://serverAddress
// in localy the server is in 8080 somehting like http://localhost:8080
function App() {
  async function fetchData() {
    const response = await fetch("http://localhost:8080/users");
    const data = await response.json();

    console.log(data);
  }

  return (
    <div className="App">
      <button onClick={fetchData}>Click</button>
    </div>
  );
}

export default App;
