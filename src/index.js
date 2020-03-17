function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    const arrExpr = Array.from(expr.matchAll(/[\d]+|[+-]|[(]|[)]|[\*]|[\/]/g));
    let isOperationStart = true;
    let operationMinus = false;
    const stack = [];

    const calculateStack = (operator, number) => {

        if (stack.length > 0) {
            let baseNumber = stack.pop();

            if (/[\d]+/.test(baseNumber)) {
                baseNumber = Number(baseNumber);

                switch (operator) {
                    case "+":
                        baseNumber += Number(number);
                        break;
                    case "-":
                        baseNumber -= Number(number);
                        break;
                    case "*":
                        baseNumber *= Number(number);
                        break;
                    case "/":
                        let divider = Number(number);

                        if (divider > 0){
                            baseNumber /= Number(number);
                        } else {
                            throw 'TypeError: Division by zero.';
                        }
                        
                        break;

                    default:
                        console.log('Invalid operation', operator);
                        break;
                }

                return baseNumber;
            }

            if (/[(]/.test(baseNumber)) {
                return 0 - Number(number);
            }

            if (/[+-/*//]/.test(baseNumber) && operator === '-') {
                return calculateStack(baseNumber, 0 - Number(number));
            }

            console.log("Ожидали число или операцию, а достали", baseNumber);

        } else if (operator === '-') {
            return 0 - Number(number);
        } else {
            console.log("Стек достиг 0 при ожидании вычисления", operator);
        }
    }

    arrExpr.forEach(itemArr => {
        item = itemArr[0];
        console.log('На входе',item);
        if (/[\d]+/.test(item)) {
            if (stack.length > 0) {
                let operation = stack.pop();
                console.log(operation, 'when item', item);

                if (/[+-/*//]/.test(operation)) {
                    console.log('this is operation: stack ', operation, item);
                    stack.push(calculateStack(operation, item));
                }

                if (/[(]/.test(operation)) {
                    stack.push(operation);
                    stack.push(item);
                }

                if (/[\d]+/.test(operation)) {
                    console.log('Подряд две цифры ',operation, item);
                }
            } else {
                stack.push(item);
                console.log(item);
            }
        }

        if (/[+-/*//]/.test(item)) {
            stack.push(item)
        }

        if (/[(]/.test(item)) {
            stack.push(item)
        }

        if (/[)]/.test(item)) {
            
        }


    })

    if (stack.length === 1) {
        return stack.pop();
    }

    console.log('Беда огорчение... стек не равен одному', stack);
}

module.exports = {
    expressionCalculator
}