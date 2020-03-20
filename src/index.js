function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    const arrExpr = expr.match(/[\d]+|[+-]|[(]|[)]|[\*]|[\/]/g);
    const stackOperation = [],
          outputList = [];
    
    const setRatingForOperator = operator => {
        const ratirator = {}

        if (operator === '/' || operator === '*') {
            ratirator.rating = 2;
        }

        if (operator === '+' || operator === '-') {
            ratirator.rating = 1;
        }

        if (operator === '(') {
            ratirator.rating = 0;
        }

        ratirator.operator = operator

        return ratirator;
    }

    const checkPriorityOperation = operator => {
        let isLookForOperator = true;

        while (stackOperation.length > 0 && isLookForOperator) {
            const prevOperator = stackOperation.pop();
            
            if (prevOperator.rating >= operator.rating) {
                outputList.push(prevOperator);
            } else {
                stackOperation.push(prevOperator)
                isLookForOperator = false;
            }
        }

        stackOperation.push(operator);
    }

    arrExpr.forEach(item => {
        if (/[\d]+/.test(item)) {
            outputList.push(item);
        }

        if (/[+-/*//]/.test(item)) {
            checkPriorityOperation(setRatingForOperator(item));
        }

        if (item === '(') {
            stackOperation.push(setRatingForOperator(item));
        }

        if (item ===')') {
            let isLookForBracket = true;
            let prevOperation;

            while (stackOperation.length > 0 && isLookForBracket) {
                prevOperation = stackOperation.pop();

                if (prevOperation.operator === '(') {
                    isLookForBracket = false;
                } else {
                    if (/[-+/*//]/.test(prevOperation.operator)) {
                        outputList.push(prevOperation);
                    }
                    if (stackOperation.length === 0) {
                        throw 'ExpressionError: Brackets must be paired';
                    }
                }
            }
        }
    })


    if (stackOperation.findIndex(item => item.operator === '(') > -1) {
        throw 'ExpressionError: Brackets must be paired';
    }

    while (stackOperation.length > 0) {
        outputList.push(stackOperation.pop());
    }

    outputList.forEach(item => {
        if (/[\d]+/.test(item)) {
            stackOperation.push(item);
        }

        if (/[+-/*//]/.test(item.operator)) {
            let regB = Number(stackOperation.pop());
            let regA = Number(stackOperation.pop());

            switch (item.operator) {
                case '+':
                    regA += regB;
                    break;
                case '-':
                    regA -= regB;
                    break;
                case '/':
                    if(regB === 0) {
                        throw 'TypeError: Division by zero.';
                    }
                    regA /= regB;
                    break;
                case '*':
                    regA *= regB;
                    break;
                default:
                    throw 'Undefined operator';
                    break;
            }
            stackOperation.push(regA);
        }
    })

    return Math.round(stackOperation.pop() * 10000) / 10000;
}

module.exports = {
    expressionCalculator
}