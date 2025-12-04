import randomColor from "randomcolor";
import { useState } from "react";

export function Welcome(props) {
  const [color] = useState(() => randomColor());
  return (
    <>
      {
        /* <h1>Welcome my Component!</h1> */
        <h1 style={{ color: color }}>
          welcome {props.name} {props.age}
        </h1>
      }
    </>
  );
}

export function BasicComp() {
  let name = "홍현기";
  let age = 18;
  let asAdmin = true;
  let isMember = false;
  return (
    <>
      <p>환영합니다, {name}님!</p>
      <p>나이는 {age}살 입니다</p>
      {/* 조건부 렌더링 //asAdmin: true : 관리자 //asAdmin: false : 일반사용자 */}
      <p>{asAdmin ? "관리자" : "일반사용자"}</p>
      <p>{isMember ? "회원 환영" : "회원가입 ㄱ"}</p>
      <p>isMember:{String(isMember)}</p>
    </>
  );
}

export function BaseComp2() {
  const user = {
    name: "김철수",
    age: 25,
    hobbies: ["독서", "여행", "코딩"],
  };
  const numbers = [1, 2, 3, 4, 5];
  return (
    <>
      <h2>{user.name}</h2>
      <p>{user.age}</p>
      <h3>취미</h3>
      <ul>
        {user.hobbies.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
      <p>Double: {numbers.map((num) => num * 2).join(", ")}</p>
      <p>짝수: {numbers.filter((num) => num % 2 === 0).join(", ")}</p>
    </>
  );
}

export function BaseComp3() {
  return <></>;
}
