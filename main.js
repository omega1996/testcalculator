const readline = require("readline");

const int = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

int.question("Введите выражение: ", (answer) => {
    parseAnswer(answer)
        .then(calculateTree)
        .then(calculated => console.log(`Результат: ${calculated}`))
        .catch(error => {console.error(error)})
        .then(int.close());

});

const sum = (...args) => args.reduce((prev,curr)=>prev+curr);  //subtraction is a type of summation
const div = (a, b) => a/b;
const mul = (a, b) => a * b;

const parseAnswer = (answer) => {
    return new Promise(resolve => {
        let matchedArray = answer.match(/([)(*/]|[\-+]?\d[.]?\d*|[\-])/g);
        matchedArray = matchedArray.map(element => !isNaN(parseFloat(element)) ? parseFloat(element) : element);
        resolve(matchedArray);
    });
};

const evaluateMath = (mathExp) => {
    if (!Array.isArray(mathExp)) return mathExp;

    if (mathExp.indexOf("-") !== -1){
        let subIndex = mathExp.indexOf("-");
        mathExp.splice(subIndex, 2, mathExp[subIndex + 1] * (-1));
        return evaluateMath(mathExp);
    } else if (mathExp.lastIndexOf("*") !== -1){
        let multiplyIndex = mathExp.lastIndexOf("*");
        let resultMul = mul(mathExp[multiplyIndex - 1], mathExp[multiplyIndex + 1]);
        mathExp.splice(multiplyIndex - 1, 3, resultMul);
        return evaluateMath(mathExp);
    } else if (mathExp.lastIndexOf("/") !== -1){
        let multiplyIndex = mathExp.lastIndexOf("/");
        let resultMul = div(mathExp[multiplyIndex - 1], mathExp[multiplyIndex + 1]);
        mathExp.splice(multiplyIndex - 1, 3, resultMul);
        return evaluateMath(mathExp);
    } else {
        return sum(...mathExp);
    }

};

const calculateTree = (fwdList) => {
    if(fwdList.indexOf(")") === -1) return evaluateMath(fwdList);

    let LeftSide = fwdList.slice(0,fwdList.indexOf(")"));
    let cutList = LeftSide.slice(fwdList.lastIndexOf("(") + 1);
    let cutListLength = cutList.length + 2;
    let mathRes = evaluateMath(cutList);
    fwdList.splice(LeftSide.lastIndexOf("("), cutListLength, mathRes);
    return calculateTree(fwdList);
};

module.exports = {sum, div, mul, calculateTree, evaluateMath, parseAnswer};