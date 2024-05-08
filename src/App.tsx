import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <div className="card">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="p-3 border rounded border-slate-700 bg-slate-200"
        >
          count is {count}
        </button>
      </div>
    </>
  );
}

export default App;
