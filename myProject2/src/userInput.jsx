export function UserInput() {
  let input = prompt("숫자를 입력하세요.");
  return (
    <>
      <h1>숫자: {input}</h1>
      {console.log(input)}
    </>
  );
}
