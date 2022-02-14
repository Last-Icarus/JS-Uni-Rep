class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        if (indicator == 0) {
            this.currentOperand = this.currentOperand.toString().slice(0, -1)
        }
    }

    appendNumber(number) {
        if (this.currentOperand.toString().length >= 15) {
            pass
        }
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }



    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '/':
                computation = prev / current
                break
            case 'mod':
                computation = prev % current
                break
            case 'log':
                computation = Math.log(current) / Math.log(prev)
                break
            case 'x^y':
                let x = 1
                for (let i = 1; i <= current; i++)
                    x = x * prev;
                computation = x
                break
            case 'root(x)':
                computation = +(Math.round(Math.pow(prev, 1 / current) + "e+10") + "e-10")
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    OneOperandCompute(operation) {
        let computation
        const operand = parseFloat(this.currentOperand)
            /*if (isNaN(operand)) return*/
        switch (operation) {
            case 'ln':
                computation = Math.log(operand)
                break
            case 'sqr':
                computation = operand * operand
                break
            case '√':
                computation = Math.sqrt(operand)
                break
            case '!':
                computation = factorial(operand)
                break
            case 'π':
                computation = Math.PI
                break
            case 'cos':
                computation = +(Math.round((Math.cos(operand * Math.PI / 180)) + "e+15") + "e-15")
                break
            case 'sin':
                computation = +(Math.round((Math.sin(operand * Math.PI / 180)) + "e+15") + "e-15")
                break
            case 'tan':
                computation = +(Math.round((Math.tan(operand * Math.PI / 180)) + "e+15") + "e-15")
                break
        }
        indicator = 1
        this.currentOperand = computation
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
                `${this.previousOperand} ${this.operation}` /* конкатенация числа и знака соответствующей операции */ /*$ нужен для определения плейсхолдера в шаблонной конструкции */
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}

function factorial(num) {
    if ((num % 1) > 0) {
        return ''
    } else {
        let rval = 1;
        for (let i = 2; i <= num; i++)
            rval = rval * i;
        return rval;
    }
}


function show() {
    document.getElementById('sidebar').classList.toggle('active')
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const OneOperandButtons = document.querySelectorAll('[data-one-operand-operation]')

var indicator = 0

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

/*!!!!!!!! индикатор не даёт провести несколько вычислений подряд !!!!!!!! */

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (indicator == 1) {
            if (calculator.previousOperand == '') {
                calculator.clear()
            }
            indicator = 0

        }
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
    indicator = 1
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

OneOperandButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.OneOperandCompute(button.innerText)
        calculator.updateDisplay()
    })
})
