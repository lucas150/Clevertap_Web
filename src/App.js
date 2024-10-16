import React from "react";
import "./App.css";

function App() {
  const handleClick = () => {
    alert("Button clicked!");
  };

  return (
    <div className="App">
      <h1>My React App</h1>
      <button onClick={handleClick}>Click Me!</button>
    </div>
  );
}

export default App;
