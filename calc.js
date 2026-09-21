const numContainer = document.querySelector(".num-container");
const opContainer = document.querySelector(".operations-container");

const numbersArray = [7,8,9,4,5,6,1,2,3,0];
const othersArray = [".", "="];
const operationsArray = ["÷", "x", "-", "+"]
const undoButtonsArray = ["<---" , "AC"]


function createNumberPad() {
    for (let i = 0; i < numbersArray.length; i++) {
        const square = document.createElement("button");
        square.className = "square";

        const numText = numbersArray[i];
        square.innerText = numText;

        numContainer.appendChild(square);
    }
}

function createOperationsPad() {
    for (let i = 0; i < operationsArray.length; i++) {
        const square = document.createElement("button");
        square.className = "square";

        const numText = operationsArray[i];
        square.innerText = numText;

        opContainer.appendChild(square);
    }
}



createNumberPad();
createOperationsPad();