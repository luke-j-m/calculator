const numberButtons = document.querySelector(".number-buttons");
const operationButtons = document.querySelector(".operation-buttons");
const input = document.querySelector(".input-box");

const operands = ["CLR", "+", "-", "x", "/", "="];
let leftValue = "";
let rightValue = "";
let currentOperand = "";
let operandPresent = false;

function createNumberButtons(){
    for(let i = 0; i < 10; i++){
        const newButton = createButton("" + i);
        newButton.addEventListener("click", () => {
            addNumberToInput("" + i);
        })
        numberButtons.appendChild(newButton);
    }
}

function createOperationButtons(){
    for(const operand of operands){
        const newButton = createButton(operand);
        if(operand === "="){
            newButton.addEventListener("click", operate);
        } else if(operand === "CLR"){
            newButton.addEventListener("click", clear);
        } else {
            newButton.addEventListener("click", () => 
                addOperandToInput(operand));
        }
        operationButtons.appendChild(newButton);
    }
}

function createButton(text){
    const newButton = document.createElement("button");
    newButton.textContent = text;
    return newButton;
}

function addNumberToInput(number){
    if(operandPresent){
        rightValue += number;
    } else {
        leftValue += number;
    }
    input.textContent = input.textContent + number;
}

function addOperandToInput(operand){
    if(operandPresent){
        alert("Cannot add multiple operands!");
    } else if (leftValue === ""){
        alert("Cannot add operand without any value preceding it!");
    } else {
        input.textContent = leftValue + " "  + operand + " ";
        currentOperand = operand;
        operandPresent = true;
    }
}

function operate(){
    let result = 0, leftNum = parseFloat(leftValue), 
    rightNum = parseFloat(rightValue);
    if(leftValue === "" || rightValue === "" || !currentOperand){
        alert("Cannot perform operation!");
        return;
    } else if(currentOperand === "+"){
        result = leftNum + rightNum;
    } else if(currentOperand === "-"){
        result = leftNum - rightNum;
    } else if(currentOperand === "x"){
        result = leftNum * rightNum;
    } else { // currentOperand === '/'
        result = leftNum / rightNum;
    }

    input.textContent = result.toFixed(4).replace(/[.]0000$/, "");
    leftValue = input.textContent;
    rightValue = "";
    operandPresent = false;
    currentOperand = "";
    
}

function clear(){
    input.textContent = "";
    leftValue = "";
    rightValue = "";
    operandPresent = false;
    currentOperand = "";
}

createNumberButtons();
createOperationButtons();

