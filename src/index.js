function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    const arrExpr = expr.match(/[\d]+|[+-]|[(]|[)]|[\*]|[\/]/g);
    const stackOperation = [],
          outputList = [];
    console.log(arrExpr)
    arrExpr.forEach(item => {

        if (/[\d]+/.test(item)) {
            outputList.push(item);
        }

        if (/[+-]/.test(item)) {
            const prevOperation = stackOperation.pop();
            if (prevOperation === '*' || prevOperation === '/') {
                outputList.push(prevOperation);
            } else {
                stackOperation.push(prevOperation);
            }
            stackOperation.push(item);
        }

        if (/[/*//]/.test(item)) {
            const prevOperation = stackOperation.pop();
            if (prevOperation === '*' || prevOperation === '/') {
                outputList.push(prevOperation);
            } else {
                stackOperation.push(prevOperation);
            }
            stackOperation.push(item);
        }

        if (item === '(') {
            stackOperation.push(item);
        }

        if (item ===')') {
            isLookForBreaket = true;
            let prevOperation;
            while (stackOperation.length > 0 && isLookForBreaket) {
                prevOperation = stackOperation.pop();

                if (prevOperation !== '(') {
                    outputList.push(prevOperation);
                } else {
                    isLookForBreaket = false;
                }
            }
        }
    })

    while (stackOperation.length > 0) {
        outputList.push(stackOperation.pop());
    }

    console.log(outputList);
}

module.exports = {
    expressionCalculator
}