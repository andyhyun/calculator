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
  return a / b;
}

function operate(operator, a, b) {
  const operations = {
    "+": add,
    "-": subtract,
    "*": multiply,
    "/": divide
  };

  return operations[operator](a, b);
}

function populateDisplay() {
  main.textContent = `${main.textContent}${this.textContent}`;
}

let memory = document.querySelector(".memory");
let main = document.querySelector(".main");

let buttons = document.querySelectorAll("button");

buttons.forEach((button) => button.addEventListener("click", populateDisplay));
