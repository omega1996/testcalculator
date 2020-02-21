const {sum, mul, div, parseAnswer} = require('./main');

describe('Math functions:', ()=>{

    test('Sum should return sum of one or more values', ()=>{
        expect(sum(1,3)).toBe(4);
        expect(sum(1)).toBe(1);
        expect(sum(1.5,3.5)).toBe(5);
        expect(sum(0.5,-3.5)).toBe(-3);
        expect(sum(0.5,-3.5, 2.3)).toBeCloseTo(-0.7);
        expect(sum(0.5,3.5, 2.3)).toBeCloseTo(6.3);
    });

    test('Mul should return multiplication of two values',()=>{
        expect(mul(1,3)).toBe(3);
        expect(mul(1,0.3)).toBe(0.3);
        expect(mul(1,0)).toBe(0);
    });

    test('Div should return quotient of two values',()=>{
        expect(div(6,3)).toBe(2);
        expect(div(10,3)).toBeCloseTo(3.333);
    });
});

describe('Parser functions:',()=>{

   test('Should return object',()=>{
       expect(parseAnswer('1+1')).toBeInstanceOf(Object);
       expect(parseAnswer('1+(1+1)')).toBeInstanceOf(Object);
       expect(parseAnswer('1-1)')).toBeInstanceOf(Object);
       expect(parseAnswer('1-(1*2))')).toBeInstanceOf(Object);
   });

    test('Should correctly group',()=>{
        expect(parseAnswer('1+1')).toStrictEqual({sum:[1,1]});
        expect(parseAnswer('1+1+1')).toStrictEqual({sum:[1,1,1]});
        expect(parseAnswer('1+(1+1)')).toStrictEqual({sum:[1,{sum:[1,1]}]});
        expect(parseAnswer('1+(-1+1)')).toStrictEqual({sum:[1,{sum:[-1,1]}]});
        expect(parseAnswer('1+(-1*1)')).toStrictEqual({sum:[1,{mul:[-1,1]}]});
        expect(parseAnswer('1*(-1*1)')).toStrictEqual({sum:[{mul:[1,{mul:[-1,1]}]}]});
        expect(parseAnswer('1+3*(3-3/2+2)+44')).toStrictEqual({sum:[1,{mul:[3,{sum:[3,{div:[-3,2]},2]}]},44]});
    })
});



