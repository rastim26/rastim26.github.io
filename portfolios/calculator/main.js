let a, b, oper, display;
isFirst = true;
display = document.getElementById("display");
display.innerHTML = 0;

function entNum(val) {
  if (isFirst || display.innerHTML == 0) {
    display.innerHTML = val;
    isFirst = false;
  } else {
    display.innerHTML += val;
  }
}

function operate(val) {
  a = +display.innerHTML;
  oper = val;
  isFirst = !isFirst;
}

function equal() {
  b = +display.innerHTML;
  console.log(Calc(oper, a, b));
}

function cancel() {
  display.innerHTML = 0;
}

function remove() {
  let arr = display.innerHTML.split("");
  arr.pop();
  display.innerHTML = arr.join("");
  // console.log(arr.join(""));
}

function Calc(oper, a, b) {
  console.log(oper, a, b);
  if (!(oper && a && b)) {
    return "Enter all the parameters!";
  }

  if (!(typeof a === "number" && typeof b === "number")) {
    return "Error. Operand is not a number";
  }
  const obj = {
    sum: a + b,
    sub: a - b,
    multi: a * b,
    div: a / b,
    prc: a % b,
    stp: a ** b,
  };

  if (!(oper in obj)) return "Unknown operation";

  return (display.innerHTML = obj[oper]);
}

// console.log(Calc("sum", 8, 2));
// console.log(Calc("multi", 8, 2));
// console.log(Calc("sub", 8, 2));
// console.log(Calc("div", 8, 2));
// console.log(Calc("prc", 8, 2));
// console.log(Calc("stp", 8, 2));
// console.log(Calc("some else", 8, 2));
// console.log(Calc("sum", "Some string", 2));
// console.log(Calc("sum", 8, true));
// console.log(Calc("sum", 8));

// function enter(id, inner)
