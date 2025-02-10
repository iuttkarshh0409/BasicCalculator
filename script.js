let display = document.getElementById('display');

function appendToDisplay(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function deleteLastChar() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        // Replace × with * for proper evaluation
        let expression = display.value.replace(/×/g, '*');
        
        // Validate the expression
        if (!isValidExpression(expression)) {
            throw new Error('Invalid expression');
        }
        
        const result = eval(expression);
        
        // Check if result is a valid number
        if (isNaN(result) || !isFinite(result)) {
            throw new Error('Invalid calculation');
        }
        
        // Format the result to avoid extremely long decimals
        display.value = Number(result.toFixed(10)).toString();
    } catch (error) {
        display.value = 'Error';
        setTimeout(clearDisplay, 1000);
    }
}

function isValidExpression(expr) {
    // Check for balanced parentheses
    let parenthesesCount = 0;
    
    for (let char of expr) {
        if (char === '(') parenthesesCount++;
        if (char === ')') parenthesesCount--;
        if (parenthesesCount < 0) return false;
    }
    
    if (parenthesesCount !== 0) return false;
    
    // Check for valid operators and numbers
    const validExprRegex = /^[0-9+\-*/(). ]*$/;
    return validExprRegex.test(expr);
}
