//변수의 타입을 알고 싶을 때
console.log(typeof 123); // "number"
console.log(typeof 123.56); // "number"
console.log(typeof "hello"); // "string"
console.log(typeof true); // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof Symbol()); // "symbol"
console.log(typeof 10n); // "bigint"
console.log(typeof function () {}); // "function"
console.log(typeof {}); // "object"
console.log(typeof []); // "object" (배열도 object로 나옴)
console.log(typeof null); // "object" (null도 object로 나타나는 특이점)

//변수의 타입을 알고 싶을 때
console.log(Object.prototype, toString.call(123)); // "number"
console.log(Object.prototype, toString.call(123.56)); // "number"
console.log(Object.prototype, toString.call("hello")); // "string"
console.log(Object.prototype, toString.call(true)); // "boolean"
console.log(Object.prototype, toString.call(undefined)); // "undefined"
console.log(Object.prototype, toString.call(Symbol())); // "symbol"
console.log(Object.prototype, toString.call(10n)); // "bigint"
console.log(
  Object.prototype,
  toString.call(function () {})
); // "function"
console.log(Object.prototype, toString.call({})); // "object"
console.log(Object.prototype, toString.call([])); // "object" (배열도 object로 나옴)
console.log(Object.prototype, toString.call(null)); // "object" (null도 object로 나타나는 특이점)

//형변환
// parseInt, ParseFloat
let str1 = "123abc"; //형변환 할때 문자열을 무시하고 숫자부분만 변환
let str2 = "12.34.xyz"; //형변환 할때 문자열을 무시하고 숫자부분만 변환
console.log(parseInt(str1)); //1234
console.log(parseFloat(str2)); //12.34

console.log(Number(str2)); //NaN 문자열이 포함되어 있으면 형변환 불가 Not a Number

//원시타입 vs 참조타입
//원시타입
let a = 10;
let b = a;
console.log(a, b);
console.log("-".repeat(20));

b = 20;
console.log(a, b);
console.log("-".repeat(20));
//참조타입
let obj1 = { name: "홍길동", age: 20 };
let obj2 = obj1;
console.log(obj1, obj2);
console.log("-".repeat(20));

obj2.name = "이나흠";
obj2.age = 18;
console.log(obj1, obj2);
console.log("-".repeat(20));

console.log(3 == "3"); //True
console.log(3 === "3"); //False
console.log(3 != "3"); //False
console.log(3 !== "3"); //True

console.log(2 + 2);
console.log("2" + "2");
console.log("2" + "2" - "2");

console.log(("b" + "a" + +"a" + "a").toLowerCase()); //baNaNa

//falsy값: 거짓으로 평가되는 값
// false, 0, -0, "", null, undefined, NaN
if (0) {
  console.log("참");
}
if ("") {
  console.log("참");
}
if (null) {
  console.log("참");
}

//truthy값: 참으로 평가되는 값
// 그 외의 모든 값: true, {}, [], "hello", 1, -1, function(){}, Symbol(), 10n
if (1) {
  console.log("참");
}
if ([]) {
  console.log("참");
}
if ({}) {
  console.log("참");
}

//&&, ||
// (조건1 == true) && (조건2 == true) => true
// falsy && 'apple' : falsy조건 a가 falsy이면 a값을 반환, b는 평가 x
console.log(0 && "apple");
console.log("hello" && 100);
// a, b조건이 boolean값인 경우
console.log(5 > 2 && 8 < 10);
// a, b조건이 truthy, falsy값인 경우
console.log(0 && "apple"); //a가 falsy이므로 a값 반환
console.log(1 && "apple"); //a가 truthy이므로 b값 반환

// a || b (둘 중에 하나만 true여도 true)
console.log(5 > 2 || 8 < 10); //true
console.log(5 < 2 || 8 < 10); //true
console.log(5 < 2 || 8 > 10); //false

// a:falsy -> b값을 리턴 a:truthy -> a값을 리턴
console.log(0 || "hello");
console.log(1 || world);

//스프레드 연산자(...)
// 배열의 요소를 하나씩 펼쳐놓는것
let arr1 = [1, 2, 3, 4, 5];
// ...arr1 => 1,2,3,4,5
let arr2 = [...arr1, 6, 7, 8, 9];
console.log(arr1, arr2);

let arr3 = [1, 2, 3];
let arr4 = [4, 5, 6];
let arr5 = [...arr3, ...arr4];
let arr6 = [1, 2, 3, ...arr4, 7, 8, 9];
console.log(arr5, arr6);

//스프레드 연산자를 함수의 인수로 전달할 때
function func_sum(...sumArr) {
  let sum = 0;
  for (let i = 0; i < sumArr.length; i++) {
    sum += sumArr[i];
  }
  return sum;
}
let sumArr = [1, 2, 3, 4, 5];
console.log(func_sum(...sumArr));

let arr7 = [..."abcde"];
console.log(arr7);

//switch문
let score = 96;
let grade = "";
switch (parseInt(score / 10)) {
  case 10:
  case 9:
    grade = "A";
    break;
  case 8:
    grade = "B";
    break;
  case 7:
    grade = "C";
    break;
  default:
    grade = "D";
}
console.log(grade);

//삼항연산자
// 조건 ? 참 : 거짓
let score2 = 56;
let ret = score2 >= 60 ? "합격" : "불합격";
console.log(ret);

//try ~ catch ~ finally
try {
  let ret2 = Number("123");
  if (isNaN(ret2)) {
    throw new Error("숫자가 아닙니다.");
  }
} catch (error) {
  console.log(error.message);
} finally {
  console.log("오빠는 끝!");
}

function moon(month) {
  switch (Number(month)) {
    case 2:
      return 28;
      break;
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
      break;
    default:
      return 31;
  }
}
console.log(moon(4));

sum = 0;
//for 반복문: 횟수가 정해져 있는 반복문
for (let i = 0; i <= 10; i += 2) {}
console.log(sum);

// while반목문 : 횟수가 정해지지 않은 반복문(조건이 참일 떄 반복)
let count = 0;
while (count < 5) {
  console.log(count);
  count++;
}

//do-while문 : 무조건 한번은 실행하는 while문
let count2 = 0;
do {
  console.log(count2);
  count2++;
} while (count2 < 5);

//break : 반복문을 벗어나는 명령어
//continue : 반복문의 처음으로 돌아가는 명령어
for (let i = 0; i < 10; i++) {
  if (i === 5) {
    continue;
    break;
  }
  console.log(i);
}
console.log("반복문 종료");

//배열의 forEach문
let fruits = ["사과", "배", "포도"];
for (let i = 0; i < fruits.length; i++) {
  console.log(`배열의 ${i + 1}번째 과일은 ${fruits[i]}입니다.`);
}
console.log("-".repeat(20));
fruits.forEach((item, index) => {
  console.log(`배열의 ${index + 1}번째 과일은 ${item}입니다.`);
});
console.log("-".repeat(20));
fruits.forEach((item) => {
  console.log(`과일은 ${item}입니다.`);
});
console.log("-".repeat(20));
fruits.forEach((item) => console.log(`과일은 ${item}입니다.`));

let a1 = (a, b, c) => {
  return a + b + c;
};
