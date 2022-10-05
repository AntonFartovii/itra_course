import React, {useState} from "react";

function App() {
    const state = useState(0)
    let likes = 0
  return (
    <div className="App">
        <h1>{likes}</h1>
      <button onClick={() => likes += 1}>Increment</button>
      <button onClick={() => likes -= 1}>Decrement</button>
    </div>
  );
}

export default App;
