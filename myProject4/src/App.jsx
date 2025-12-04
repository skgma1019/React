import { useState } from "react";
import "./App.css";
import Home from "./myHome";
import Order from "./myOrder";
import Cart from "./myCart";
import { Footer } from "./myComp";

function App() {
  const [selected, setSelected] = useState(1);
  const [orderHistory, setOrderHistory] = useState([]);

  return (
    <>
      <div className="header">
        <img src="/vite.svg" alt="" />
        <button
          className={selected === 1 ? "active" : ""}
          onClick={() => setSelected(1)}
        >
          Home
        </button>
        <button
          className={selected === 2 ? "active" : ""}
          onClick={() => setSelected(2)}
        >
          Cart
        </button>
      </div>

      {selected === 1 && (
        <Home orderHistory={orderHistory} setOrderHistory={setOrderHistory} />
      )}
      {selected === 2 && (
        <Cart
          orderHistory={orderHistory}
          onChangeQty={(idx, newQty) => {
            setOrderHistory((prev) =>
              prev.map((item, i) =>
                i === idx ? { ...item, 수량: newQty } : item
              )
            );
          }}
          onRemove={(idx) => {
            setOrderHistory((prev) => prev.filter((_, i) => i !== idx));
          }}
        />
      )}
      <Footer />
    </>
  );
}

export default App;
