import { useState } from "react";
export function ButtonClick() {
  const [count, setCount] = useState(0);
  return (
    <>
      <button onClick={() => setCount((count) => (count += 6974))}>
        {count >= 100000 ? <h1>그만눌러</h1> : <h1>버튼을 {count}번 누름</h1>}
      </button>
    </>
  );
}
