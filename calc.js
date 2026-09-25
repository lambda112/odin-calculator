const numContainer = document.querySelector(".num-container");
const opContainer = document.querySelector(".operations-container");
const screen = document.querySelector(".screen");

const numbersArray = [7,8,9,4,5,6,1,2,3,0];
const othersArray = [".", "="];
const operationsArray = ["÷","x","-","+"]
const undoButtonsArray = ["<---" , "AC"]

let valuesPressed = [];
const loopLength = numbersArray.length + othersArray.length;


function createNumberPad() {
    for (let i = 0; i < numbersArray.length; i++) {
        const square = document.createElement("button");
        square.className = "square";

        const numText = numbersArray[i];
        square.innerText = numText;

        // https://www.reddit.com/r/learnjavascript/comments/twljtu/how_do_i_pass_arguments_to_a_function_inside/
        square.addEventListener("click", event => {buttonPressed(square.textContent)});
        numContainer.appendChild(square);
    }
}

function createOtherPad() {
    for (let i = 0; i < othersArray.length; i++) {
        const square = document.createElement("button");
        square.className = "square";

        const numText = othersArray[i];
        square.innerText = numText;

        // https://www.reddit.com/r/learnjavascript/comments/twljtu/how_do_i_pass_arguments_to_a_function_inside/

        if (i === 1) {
            console.log("Listener added!" + " " + numText)
            square.addEventListener("click", event => {equalsPressed(screen.innerText)});
        }
        
        numContainer.appendChild(square);
    }
}

function createOperationsPad() {
    for (let i = 0; i < operationsArray.length; i++) {
        const square = document.createElement("button");
        square.className = "square";

        const numText = operationsArray[i];
        square.innerText = numText;
        square.addEventListener("click", event => {buttonPressed(square.textContent)});
        opContainer.appendChild(square);
    }
}

function buttonPressed(btnText) {
    const isOperation = operationsArray.includes(btnText);
    const isNumber = numbersArray.includes(Number(btnText));
    let lastValuePressed = valuesPressed.at(-1);

    console.log(lastValuePressed)

    if (isNumber) {
        screen.innerText = screen.textContent + btnText;
        lastValuePressed = lastValuePressed === undefined ? lastValuePressed : String(lastValuePressed);
        if (valuesPressed.length !== 0 && numbersArray.includes(Number(lastValuePressed.slice(-1)))){
            valuesPressed[valuesPressed.length - 1] = lastValuePressed + btnText;
        }

        else {
            valuesPressed.push(btnText);
        }
    } 

    else if (isOperation && operationsArray.includes(lastValuePressed) === false && valuesPressed.length !== 3) {
        valuesPressed.push(btnText);
        screen.innerText = screen.textContent + btnText;
    }

    console.log(valuesPressed, btnText, valuesPressed.length);
}

function equalsPressed() {
    let result = "None";

    console.log(valuesPressed.length)
    if (valuesPressed.length < 3) {
        console.log("worked");
        return "Two numbers and operator not entered!";
    } 

    const num1 = valuesPressed[0];
    const operator = valuesPressed[1];
    const num2 = valuesPressed[2]; 

    switch(operator) {
        case "+":
            result = addition(num1,num2);
            break;
        
        case "-":
            result = subtraction(num1,num2);
            break;

        // Change Below
        case "x":
            result = subtraction(num1,num2);
            break;

        case "÷":
            result = subtraction(num1,num2);
            break;
    }

    screen.innerText = result === "None" ? screen.innerText : result;
}

function addition(num1, num2) {
    result = Number(num1) + Number(num2);
    valuesPressed = [result];
    return result;
}

function subtraction(num1, num2) {
    result = Number(num1) - Number(num2);
    valuesPressed = [result];
    return result;

}

createNumberPad();
createOtherPad();
createOperationsPad();