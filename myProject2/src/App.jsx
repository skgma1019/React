import "./App.css";
import { Welcome, BasicComp, BaseComp2 } from "./myComp.jsx";
import { ButtonClick } from "./button.jsx";
import { UserInput } from "./userInput.jsx";
function App() {
  // 화면에 렌더링 되는 부분
  // let myName = "홍염기";
  // let age = 18;
  return (
    <>
      {/* <h1>aaaa</h1> */}
      {/* <Welcome name={myName} age={age}></Welcome> */}
      {/* <BasicComp></BasicComp> */}
      {/* <BaseComp2 /> */}
      {/* <ButtonClick /> */}
      <UserInput></UserInput>
    </>
  );
}

export default App;
