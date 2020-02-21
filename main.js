const readline = require('readline');

const int = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

int.question('Введите выражение: ', (answer) => {
    // TODO: complete the task
    let parsedTree = parseAnswer(answer);
    let calculated = calculateTree(parsedTree);
    console.log(`Результат: ${calculated}`);

    int.close();
});


(a+(b+c))+(a+b)

const sum = (...args) => args.reduce((prev,curr)=>prev+curr)  //subtraction is a type of summation
const div = (a, b) => a / b
const mul = (a, b) => a * b

const growTree = (parsedAnswer, initial=0)=>{
    let expression = initial===0?{sum:[]}:{sum: [initial]};
    parsedAnswer.reduce((previousValue, currentValue, index, array)  => {
        if (!isNaN(parseFloat(previousValue)) && !isNaN(parseFloat(currentValue)) ){
            expression['sum'].push(parseFloat(previousValue))
            if (index === array.length-1){
                expression['sum'].push(parseFloat(currentValue))
            }
            return currentValue
        } else if (!isNaN(parseFloat(previousValue)) && isNaN(parseFloat(currentValue))){
            if (currentValue === '('){
                expression['sum'].push(parseFloat(previousValue))
                return growTree(array.slice(index))
            } else if (currentValue === ')'){
                return currentValue
            } else if (currentValue === '+'){
                expression['sum'].push(parseFloat(previousValue))
                return growTree(array.slice(index))
            }
        } else if (isNaN(parseFloat(previousValue)) && isNaN(parseFloat(currentValue))){

        }
    })
    return expression
}

const parseAnswer = (answer) => {
    let regExp = /([)(*/]|[-+]?\d*)/g;
    let parsedAnswer = answer.match(regExp).filter(a=>a);
    let tree = growTree(parsedAnswer);
    return tree
}

module.exports = {sum, div, mul, parseAnswer}