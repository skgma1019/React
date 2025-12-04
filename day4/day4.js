//object (쌍 : key-value한 쌍으로 이루어진 데이터 집합)
const obj1 = {
  name: "홍길동",
  age: 20,
  greet: function () {
    console.log(`안녕하세요 나는 ${this.name}입니다.`);
  },
};
console.log(obj1.name, obj1["age"]);
console.log("-".repeat(20));
obj1.name = "김철수";
obj1.greet();

obj1.telno = "010-9999-8888";
console.log(obj1);

//객체 안에 특정 요소가 있는지 확인 : in 연산자
console.log("name" in obj1);
console.log("telno" in obj1);
delete obj1.telno;
console.log("telno" in obj1);
console.log(obj1.hasOwnProperty("age"));
console.log(obj1.hasOwnProperty("telno"));

//객체를 순회하는 방법
for (let key in obj1) {
  console.log(key, ":", obj1[key]);
}

//Object.keys() : 객체의 key값들을 배열로 반환
console.log(Object.keys(obj1));

//Object.values() : 객체의 value값들을 배열로 반환
console.log(Object.values(obj1));

//Object.entries() : 객체의 key-value 쌍을 2차원 배열로 반환
console.log(Object.entries(obj1));

for (const [key, value] of Object.entries(obj1)) {
  console.log(`${key}:`, value);
}

const stock = [
  { prod_name: "새우깡", stock: 4 },
  { prod_name: "감자깡", stock: 5 },
  { prod_name: "고구마깡", stock: 3 },
  { prod_name: "감자깡", stock: 5 },
];

const stocks = {};
stock.forEach((item) => {
  if (stocks[item.prod_name]) stocks[item.prod_name] += item.stock;
  else stocks[item.prod_name] = item.stock;
});
console.log(stocks);

//하나의 변수에 여러 값을 저장할 수 있는 데이터 구조 : 배열
// 인덱스를 통해서 관리된다. : 숫자, 문자, 객체, 함수등 다양한 자료형을 저장할 수 있다.
// [] 표현
let arr1 = ["apple", "banana", "cherry", "orange"];
console.log(arr1[0], arr1[1], arr1[2]);
console.log(arr1.length);

arr1[100] = "mango";
console.log(arr1.length);
console.log(arr1);

//배열의 메서드
let arr2 = ["성시경", "김흥국", "조용필"];

//배열 맨 끝에 요소를 추가 : push()
arr2.push("임재범");
console.log(arr2);

//배열 맨 앞에 요소를 추가 : unshift()
arr2.unshift("김건모");
console.log(arr2);

//배열 맨 끝 요소 제거 : pop()
arr2.pop();
console.log(arr2);

//배열 맨 앞에 요소를 삭제 : shift()
arr2.shift();
console.log(arr2);

for (let i = 0; i < arr2.length; i++) {
  console.log(arr2[i]);
}
console.log("-".repeat(20));
arr2.forEach((singer) => {
  console.log(singer);
});

const arr3 = [1, 2, 3];
const arr4 = ["a", "b", "c"];

const arr5 = arr3.concat(arr4);
console.log(arr5);

//map() : 배열의 각 요소에 대해 주어진 함수를 호출한 결과를 모아 새로운 배열을 반환
const arr6 = [1, 2, 3];
const arr7 = arr6.map((item) => item ** 2);
console.log(arr6, "||", arr7);

const arr8 = ["apple", "banana", "cherry"].map((item) => item.toUpperCase());
console.log(arr8);

const arr9 = [5, 10, 15].map((num) => (num + 5) * 8);
console.log(arr9);

//filter() : 배열의 각 요소에 대해 주어진 함수를 호출하여 true인 요소들로만 구성ㄷ된 새로운 배열을
const arr10 = [1, 2, 3, 4, 5, 6].filter((item) => item % 2 === 0);
console.log(arr10);

const fruits1 = [
  "apple",
  "banana",
  "cherry",
  "avocado",
  "orange",
  "kiwi",
  "grape",
].filter((item) => item.length >= 6);
console.log(fruits1);

const num1 = [10, 20, 30, 40, 50].filter((item) => item > 20);
console.log(num1);

//reduce() : 배열의 각 요소에 대해 주어진 함수를 호출하여 하나의 결과값을 반환
let acc10 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].reduce(
  (sum, item) => sum * item,
  1
);
console.log(acc10);

const fruits = ["apple", "banana", "cherry"];

console.log(fruits);

fruits.push("orange");

fruits.unshift("watermelon");

console.log(fruits);

fruits.pop();

fruits.forEach((item, index) => {
  console.log(`index->${index}, item->${item}`);
});

fruits.slice(1, 3);
console.log(fruits);

console.log(fruits.includes("watermelon") ? "있어요" : "없어요");
console.log(fruits.sort());

let upperFruits = fruits.map((item) => item.toUpperCase());
console.log(upperFruits);

class Person {
  //생성자 메서드 -> 속성
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  introduce() {
    return `안녕하세요 나는 ${this.name}이고, ${this.age}살 입니다.`;
  }
}

let person1 = new Person("홍길동", 18);
let person2 = new Person("붕어빵", 12);
console.log(person1.introduce());
console.log(person2.introduce());

//상속 : extends
class Student extends Person {
  constructor(arg_name, arg_age, arg_grade) {
    super(arg_name, arg_age);
    this.grade = arg_grade;
  }
  study() {
    return `${this.name}은 ${this.grade}학년 입니다.`;
  }
}
const class2 = new Student("홍길동", 20, 3);
console.log(class2);

class Monster {
  constructor(name, hp, mp) {
    this.name = name;
    this.hp = hp;
    this.mp = mp;
  }
  Attack() {
    console.log(`${this.name}이 공격을 합니다`);
  }
  defense() {
    console.log(`${this.name}이 방어를 합니다`);
  }
}
const Attack = new Monster("금은찬", 69, 74);
Attack.Attack();
Attack.defense();
