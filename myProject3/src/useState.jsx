//useState 사용예시
// 함수형 컴포넌트 상태 (state) 관리하기 위한 기본적인 Hook
// 컴포넌트 안에서 같이 변할 수 있는 데이터를 저장할 때 사용
// const [상태변수, 상태변경함수] == useState(초기값)
import { useState } from "react";

export function StateComp() {
  const [count, setCount] = useState(0);
  return (
    <>
      <h1>{count}번 실행됨</h1>
      <button onClick={() => setCount(count + 1)}>click</button>
    </>
  );
}

export function Counter() {
  const [count, setCount] = useState(0);
  const [pin, setPin] = useState(true);
  return (
    <>
      <p>현재 카운트 : {count}</p>
      {pin ? (
        <>
          <button onClick={() => setCount(count + 1)}>증가</button>
          <br />
          <button
            onClick={() => setCount((count) => (count > 0 ? count - 1 : 0))}
          >
            감소
          </button>
          <br />
          <button onClick={() => setPin(false)}>pin this</button>
        </>
      ) : (
        <>
          <button onClick={() => setCount(count)}>증가</button>
          <br />
          <button onClick={() => setCount(count)}>감소</button>
          <br />
          <button onClick={() => setPin(true)}>👺 pin this</button>
        </>
      )}
    </>
  );
}
