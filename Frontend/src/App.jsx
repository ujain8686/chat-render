import React, { useState } from "react";
import "./App.css";
import ErrorBoundary from "./ErrorBoundary";

function App() {
  const handleChange = (e) => {
    console.log(e.target.value, "event");
  };

  const handleClick = (e) => {
    console.log(e, "ul");
  };

  const [count, setCount] = useState(0);

  if (count > 5) {
    throw new Error("errororororo");
  }
  
  const handleIncrement = () => {
    
    setCount((c) => c + 1);
  };

  return (
    <>
        <div>Counter: {count}</div>
        <button onClick={handleIncrement}>Increment</button>
      {/* <div>
        <label htmlFor="name">Name</label>
        <br />
        <input
          id="name"
          type="text"
          autoComplete="off"
          onChange={handleChange}
          onPaste={(e) => {
            e.preventDefault();
            alert("Paste now allowed");
          }}
        />

        <ul onClick={handleClick}>
          <li>aa</li>
          <li>bb</li>
        </ul>
      </div> */}
    </>
  );
}

export default App;
