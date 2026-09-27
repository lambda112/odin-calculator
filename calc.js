const numContainer = document.querySelector(".num-container");
const opContainer = document.querySelector(".operations-container");
const resetContainer = document.querySelector(".reset-options")
const screen = document.querySelector(".screen");

const numbersArray = [7,8,9,4,5,6,1,2,3,0];
const othersArray = [".", "="];
const operationsArray = ["÷","x","-","+"]
const undoButtonsArray = ["<---" , "AC"]

let valuesPressed = [];
const loopLength = numbersArray.length + othersArray.length;
const errorDivisionText = "Calculator not know!";


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
            square.addEventListener("click", event => {equalsPressed(screen.innerText)});
        }

        if (i === 0) {
            square.addEventListener("click", event => {decimalPressed()});
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

function createResetPad() {
    for (let i = 0; i < undoButtonsArray.length; i++) {
        const square = document.createElement("button");
        square.className = "square";

        const numText = undoButtonsArray[i];
        square.innerText = numText;
        square.style.flexBasis = "37.5px";

        if (i === 0) {
            square.addEventListener("click", event => {undoPressed()});
        } 

        if (i === 1) {
            square.addEventListener("click", event => {(clearPressed())});
        } 
        
        resetContainer.appendChild(square);
    }
}

function clearPressed() {
    valuesPressed = [];
    screen.textContent = "";
}

function undoPressed() {
    if (valuesPressed.length === 0) {
        return "Empty!"
    }

    console.log(valuesPressed);
    valuesPressed[valuesPressed.length-1] = String(valuesPressed.at(-1)).slice(0, -1);

    if (valuesPressed[valuesPressed.length-1] === "") {
        valuesPressed.length -= 1;
    }
    
    screen.textContent = valuesPressed.join("");
}


function numberPressed(lastValuePressed, btnText) {
    screen.innerText = screen.textContent + btnText;
    lastValuePressed = lastValuePressed === undefined ? lastValuePressed : String(lastValuePressed);
    const isArrayLengthZero = valuesPressed.length !== 0;
    const isLastDigitNum = lastValuePressed === undefined || valuesPressed.length === 0 ? false : numbersArray.includes(Number(lastValuePressed.slice(-1)));
    const isLastDigitDecimal = lastValuePressed === undefined || valuesPressed.length === 0 ? false : String(valuesPressed[valuesPressed.length - 1]).includes(".");
    
    if (isArrayLengthZero && isLastDigitNum || isLastDigitDecimal){
        valuesPressed[valuesPressed.length - 1] = lastValuePressed + btnText;
    }

    else {
        valuesPressed.push(btnText);
    }
}


function operationPressed(btnText) {
    valuesPressed.push(btnText);
    if (valuesPressed.length === 4) {
        equalsPressed();
    } 

    screen.innerText = screen.textContent + btnText;
}


function chooseOperation(operator, num1, num2) {   
    switch(operator) {
        case "+":
            return addition(num1,num2);
        
        case "-":
            return subtraction(num1,num2);

        case "x":
            return multiplication(num1,num2);

        case "÷":
            return division(num1,num2);
    }
}


function decimalPressed() {

    if (valuesPressed.length === 0 || operationsArray.includes(valuesPressed.at(-1))) {
        return "Decimal Cant Be Placed First."
    }

    const isDecimalInsideString = String(valuesPressed.at(-1)).includes(".");

    if (isDecimalInsideString === false) {
        numberPressed(valuesPressed.at(-1), ".");
    }
}


function equalsPressed() {
    let result = "None";

    if (valuesPressed.length < 3) {
        console.log("worked");
        return "Two numbers and operator not entered!";
    } 

    const num1 = valuesPressed[0];
    const operator = valuesPressed[1];
    const num2 = valuesPressed[2]; 

    result = chooseOperation(operator, num1, num2);

    if ([num1,num2].includes("0") && operator==="÷")  {
        valuesPressed = [];
        screen.textContent = errorDivisionText;
        screen.style.fontSize = "30px";
    }

    else {
        screen.innerText = result === "None" ? screen.innerText : result;
    }
    
}


function buttonPressed(btnText) {
    const isOperation = operationsArray.includes(btnText);
    const isNumber = numbersArray.includes(Number(btnText));

    if (screen.textContent === errorDivisionText) {screen.style.fontSize = "30px"; screen.textContent = "";}

    if (isNumber) {
        numberPressed(valuesPressed.at(-1), btnText);
    } 

    else if (isOperation && operationsArray.includes(valuesPressed.at(-1)) === false && valuesPressed.length !== 0) {
        operationPressed(btnText)
    }

    console.log(valuesPressed, btnText);
}


function addition(num1, num2) {
    result = Number(num1) + Number(num2);
    valuesPressed = resetValuesPressed(result)
    return result;
}


function subtraction(num1, num2) {
    result = Number(num1) - Number(num2);
    valuesPressed = resetValuesPressed(result)
    return result;
}


function multiplication(num1, num2) {
    result = Number(num1) * Number(num2);
    valuesPressed = resetValuesPressed(result)
    return result;
}


function division(num1, num2) {
    result = Number(num1) / Number(num2);
    valuesPressed = resetValuesPressed(result);
    return result;
}


function resetValuesPressed(result) {
    if (valuesPressed.length === 4){
        const newOperator = valuesPressed[3];
        return [result, newOperator];
    }

    return [result];
}

createResetPad();
createNumberPad();
createOtherPad();
createOperationsPad();