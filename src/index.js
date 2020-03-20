function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    const arrExpr = expr.match(/[\d]+|[+-]|[(]|[)]|[\*]|[\/]/g);
    const stackOperation = [],
          outputList = [];
    
    const setRatingForOperator = operator => {
        const ratirator = {
            operator
        }

        if (operator === '/' || operator === '*') {
            ratirator.rating = 2;
        }

        if (operator === '+' || operator === '-') {
            ratirator.rating = 1;
        }

        if (operator === '(') {
            ratirator.rating = 0;
        }

        return ratirator;
    }

    const checkPriorityOperation = newOperator => {
        let isLookForOperator = true;

        while (stackOperation.length > 0 && isLookForOperator) {
            const prevOperator = stackOperation.pop();
            
            if (prevOperator.rating >= newOperator.rating) {
                outputList.push(prevOperator);
            } else {
                stackOperation.push(prevOperator)
                isLookForOperator = false;
            }
        }

        stackOperation.push(newOperator);
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

            while (stackOperation.length > 0 && isLookForBracket) {
                const prevOperator = stackOperation.pop();

                if (prevOperator.operator === '(') {
                    isLookForBracket = false;
                } else {
                    if (stackOperation.length === 0) {
                        throw 'ExpressionError: Brackets must be paired';
                    }
                    outputList.push(prevOperator);
                }
            }
        }
    })


    if (stackOperation.findIndex(item => item.operator === '(' ) > -1) {
        throw 'ExpressionError: Brackets must be paired';
    }

    while (stackOperation.length > 0) {
        outputList.push(stackOperation.pop());
    }

    const operation = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => {
            if (b === 0) {
                throw 'TypeError: Division by zero.';
            }
            return a / b;
        }
    }

    outputList.forEach(item => {
        if (/[\d]+/.test(item)) {
            stackOperation.push(item);
        }

        if (/[+-/*//]/.test(item.operator)) {
            let regB = Number(stackOperation.pop());
            let regA = Number(stackOperation.pop());

            stackOperation.push(operation[item.operator](regA, regB))
        }
    })

    return Math.round(stackOperation.pop() * 10000) / 10000;
}

module.exports = {
    expressionCalculator
}