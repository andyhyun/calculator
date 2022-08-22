"use strict";

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  let result = a / b;
  
  // based on https://stackoverflow.com/a/11832950
  return Math.round((result + Number.EPSILON) * 10000) / 10000;
}

function operate(operator, a, b) {
  const operations = {
    "+": add,
    "-": subtract,
    "*": multiply,
    "/": divide
  };

  return operations[operator](parseFloat(a), parseFloat(b));
}

function showError() {
  doClear();
  main.textContent = "ERROR";
}

function displayNumber() {
  if (main.textContent === "ERROR") {
    main.textContent = "";
  }

  main.textContent = `${main.textContent}${this.textContent}`;
}

function doOperation() {
  if (
    main.textContent.length === 0 ||
    main.textContent.charAt(main.textContent.length - 1) === "." ||
    main.textContent === "ERROR"
  ) {
    return;
  }

  if (
    memory.textContent.length === 0 ||
    memory.textContent.charAt(memory.textContent.length - 1) === "="
  ) {
    memory.textContent = `${parseFloat(main.textContent)} ${this.textContent}`;
  } else {
    let splitMemoryText = memory.textContent.split(" ");
    let number = splitMemoryText[0];
    let operator = splitMemoryText[1];
    let result = operate(operator, number, main.textContent);
    if (result === Infinity) {
      showError();
      return;
    }
    memory.textContent = `${result} ${this.textContent}`;
  }

  main.textContent = "";
}

function doEquals() {
  if (
    main.textContent.length === 0 ||
    memory.textContent.length === 0 ||
    main.textContent.charAt(main.textContent.length - 1) === "."
  ) {
    return;
  }

  memory.textContent = `${memory.textContent} ${parseFloat(main.textContent)} =`;
  let splitMemoryText = memory.textContent.split(" ");
  let firstNumber = splitMemoryText[0];
  let operator = splitMemoryText[1];
  let secondNumber = splitMemoryText[2];
  let result = operate(operator, firstNumber, secondNumber);
  if (result === Infinity) {
    showError();
    return;
  }
  main.textContent = `${result}`;
}

function doDecimal() {
  if (main.textContent === "ERROR") {
    main.textContent = "";
  }

  if (!main.textContent.includes(".")) {
    main.textContent = `${main.textContent}.`;
  }
}

function doDelete() {
  if (main.textContent.length > 0) {
    main.textContent = main.textContent.slice(0, -1);
  }
}

function doClear() {
  memory.textContent = "";
  main.textContent = "";
}

let memory = document.querySelector(".memory");
let main = document.querySelector(".main");

let numbers = document.querySelectorAll("button[data-type=number]");
let operators = document.querySelectorAll("button[data-type=operator]");
let equals = document.querySelector("button[data-type=equals]");
let clear = document.querySelector("button[data-type=clear]");
let decimal = document.querySelector("button[data-type=decimal]");
let del = document.querySelector("button[data-type=del]");

numbers.forEach((number) => number.addEventListener("click", displayNumber));
operators.forEach((operator) => operator.addEventListener("click", doOperation));
equals.addEventListener("click", doEquals);
clear.addEventListener("click", doClear);
decimal.addEventListener("click", doDecimal);
del.addEventListener("click", doDelete);
