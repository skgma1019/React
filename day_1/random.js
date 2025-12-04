const answer = Math.floor(Math.random() * 50 + 1);
let count = 0;

while (true) {
  let input = prompt("숫자 입력 (1 ~ 50): ");
  count++;
  input = Number(input);
  if (input === answer) {
    alert(`정답! 시도 횟수: ${count}`);
    break;
  } else if (input < answer) {
    alert("숫자가 작습니다. 다시 시도하세요");
  } else {
    alert("숫자가 큽니다. 다시 시도해 주세요");
  }
}
