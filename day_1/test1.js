let name = "홍길동";

let age = 20;

console.log(`나는 ${age}살이고, 이름은 ${name}입니다.`);

let num = 1000;
console.log(`${num.toLocaleString()}원`);

//변수
let ret = 0; //변경 가능한 변수
ret = 3; //변수 할당
console.log(ret);
let ret = "abe"; //재선언 불가

const con = "홍길동"; //변경 불가한 상수
con = "김철수"; //값 할당 불가
const con = "김철수"; //재선언 불가
console.log(con);
