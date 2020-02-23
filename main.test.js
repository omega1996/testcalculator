const {sum, mul, div, calculateTree, evaluateMath, parseAnswer} = require("./main");

describe("Math functions:", () => {

    test("Sum should return sum of one or more values", () => {
        expect(sum(1, 3)).toBe(4);
        expect(sum(1)).toBe(1);
        expect(sum(1.5, 3.5)).toBe(5);
        expect(sum(0.5, -3.5)).toBe(-3);
        expect(sum(0.5, -3.5, 2.3)).toBeCloseTo(-0.7);
        expect(sum(0.5, 3.5, 2.3)).toBeCloseTo(6.3);
        expect(sum(...[0.5, 3.5, 2.3])).toBeCloseTo(6.3);
        expect(sum(...[1])).toBe(1);
    });

    test("Mul should return multiplication of two values",() => {
        expect(mul(1,3)).toBe(3);
        expect(mul(1,0.3)).toBe(0.3);
        expect(mul(1,0)).toBe(0);
        expect(mul(0.5,2)).toBe(1);
    });

    test("Div should return quotient of two values",() => {
        expect(div(6,3)).toBe(2);
        expect(div(10,3)).toBeCloseTo(3.333);
        expect(div(1,0)).toBeCloseTo(Infinity);
    });
});


describe("Math evaluation functions:",() => {

    test("Should return a number",() => {
        expect(evaluateMath(3)).not.toBeNaN();
        expect(typeof evaluateMath([3])).toBe("number");
        expect(typeof evaluateMath([3, 3])).toBe("number");
        expect(typeof evaluateMath([3, "/", 3])).toBe("number");
    });

    test("Should return a valid math result",() => {
        expect(evaluateMath(3)).toBe(3);
        expect(evaluateMath([3])).toBe(3);
        expect(evaluateMath([3, 3])).toBe(6);
        expect(evaluateMath([3, "/", 3])).toBe(1);
        expect(evaluateMath([3, "*", 3])).toBe(9);
        expect(evaluateMath([4, "*", 0.5])).toBe(2);
        expect(evaluateMath([2, 2, "*", 2])).toBe(6);
        expect(evaluateMath([2, -2, "*", 2])).toBe(-2);
        expect(evaluateMath([1, -1, 1, -1])).toBe(0);
        expect(evaluateMath([1, 2, -3])).toBe(0);
        expect(evaluateMath([3, "/", -3])).toBe(-1);
        expect(evaluateMath([1, "/",  -2])).toBe(-0.5);
    });
});

describe("Parsing functions:",() => {

    test("Should return an Array",async () => {
        expect( Array.isArray( await parseAnswer("2*(2-2)"))).toBeTruthy()
    });

    test("Should correctly work with numbers",async ()=>{
        expect( await parseAnswer("2+2")).toEqual([2,2]);
        expect( await parseAnswer("2-2")).toEqual([2,-2]);
    });

    test("Should correctly work with brackets and math signs",async ()=> {
        expect( await parseAnswer("2-(2-2)")).toEqual([2,"-","(",2,-2,")"]);
        expect( await parseAnswer("2*(2-2)")).toEqual([2,"*","(",2,-2,")"]);
        expect( await parseAnswer("2*(1+(2-2))")).toEqual([2,"*","(",1,"(",2,-2,")",")"]);
    });
    test("Should not return '+' signs",async ()=> {
        expect( await parseAnswer("2+(2-2)")).toEqual([2,"(",2,-2,")"]);
    });
});


describe("Calculating functions:",()=>{

    test("Should calculate simple expressions",async ()=> {
        expect( calculateTree([1,1])).toBe(2);
        expect( calculateTree([1,-1])).toBe(0);
        expect( calculateTree([1,2,-3])).toBe(0);
    });

    test("Should calculate expressions with brackets",async ()=> {
        expect( calculateTree([1,1])).toBe(2);
        expect( calculateTree([2,"*","(",1,"(",2,-2,")",")"])).toBe(2);
        expect( calculateTree([2,"-","(",2,-2,")"])).toBe(2);
        expect( calculateTree([2,"(",2,-2,")"])).toBe(2);
        expect( calculateTree([2,"(",2,"*",-2,")"])).toBe(-2);
    });
});