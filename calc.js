const numContainer = document.querySelector(".num-container");
const opContainer = document.querySelector(".operations-container");
const screen = document.querySelector(".screen");

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

        // https://www.reddit.com/r/learnjavascript/comments/twljtu/how_do_i_pass_arguments_to_a_function_inside/
        square.addEventListener("click", event => {numberButtonPressed(square.textContent)});

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

function numberButtonPressed(btnText) {
    screen.innerText = screen.textContent + btnText;
    console.log(screen.innerText);
}

createNumberPad();
createOperationsPad();