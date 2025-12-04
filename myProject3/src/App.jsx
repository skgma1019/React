import "./App.css";
import "./myComp.css";
import "./toDo.css";
import { EventComp } from "./myComp.jsx";
import { StateComp, Counter } from "./useState.jsx";
import { ToDo } from "./toDo.jsx";
import { useState } from "react";
function App() {
  const [selected, setSelected] = useState(0);
  return (
    <>
      <div>
        <button onClick={() => setSelected(1)}>Counter</button>
        <button onClick={() => setSelected(2)}>ToDo</button>
      </div>
      {selected === 1 && <Counter />}
      {selected === 2 && <ToDo />}
    </>
  );
}

export default App;
