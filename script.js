// Global Variables


let previousNumberText = document.querySelector('.previousNumberText')
let currentNumberText = document.querySelector('.currentNumberText')


const numberButtons = document.querySelectorAll('.number-btn')
const operationButtons = document.querySelectorAll('.operation')


// The Calculator class contains all our methods, it also keeps track of the current of the numbers at all time


class Calculator {
    constructor(previousNumber, currentNumber) {
        this.previousNumber = previousNumber;
        this.currentNumber = currentNumber;
        this.operation = undefined;
        this.clear()
    }


    clear() {
        this.previousNumber = '';
        this.currentNumber = '';
        previousNumberText.innerText = '';
        currentNumberText.innerText = '';
    }


    appendNumber (number) {
        this.currentNumber = this.currentNumber.toString() + number.toString()
    }


    delete () {
        this.currentNumber = this.currentNumber.toString().slice(0, -1)
    }


    selectOperation (operation) {
        if (this.currentNumber === '') return
        if (this.previousNumber !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousNumber = this.currentNumber
        this.currentNumber = ''

    }


    compute() {
        let computation;
        const prev = parseFloat(this.previousNumber)
        const current = parseFloat(this.currentNumber)
        if (isNaN(prev) || isNaN(current)) return
        if (this.operation == '+') {
            computation = prev + current
        }
        if (this.operation == '-') {
            computation = prev - current
        }
        if (this.operation == 'X') {
            computation = prev * current
        }
        if (this.operation == '÷') {
            computation = prev / current
        }

        this.currentNumber = computation
        console.log(computation)
        this.operation = undefined
        this.previousNumber = ''
    }


    updateScreen() {
        currentNumberText.innerText = this.currentNumber;
        previousNumberText.innerText = this.previousNumber;
    }


}


let calculator = new Calculator(currentNumberText, previousNumberText);


numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateScreen()
    })
});


operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.selectOperation(button.innerText)
        calculator.updateScreen()
    })
});

let equalsButton = document.querySelector('.equals').addEventListener('click', () => {
    calculator.compute()
    calculator.updateScreen()
})
let allClear = document.querySelector('.all-clear').addEventListener('click', () => {
    calculator.clear()
    calculator.updateScreen()
})
let deleteNumber = document.querySelector('.delete').addEventListener('click', () => {
    calculator.delete()
    calculator.updateScreen()
})