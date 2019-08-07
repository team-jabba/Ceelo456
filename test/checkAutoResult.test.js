import { checkAutoResult } from '../javascript/gameplay/checkAutoResult.js';

const test = QUnit.test;

QUnit.module('Check Auto Result');

test('checking 456', assert => {
    //arrange
    const testArr = [4, 5, 6];
    const expected = 'win';

    //act
    const result = checkAutoResult(testArr);

    //assert
    assert.equal(expected, result);
});

test('checking 116', assert => {
    //arrange
    const testArr = [1, 1, 6];
    const expected = 'win';

    //act
    const result = checkAutoResult(testArr);

    //assert
    assert.equal(expected, result);
});

test('checking 123', assert => {
    //arrange
    const testArr = [1, 2, 3];
    const expected = 'lose';

    //act
    const result = checkAutoResult(testArr);

    //assert
    assert.equal(expected, result);
});

test('checking 221', assert => {
    //arrange
    const testArr = [2, 2, 1];
    const expected = 'lose';

    //act
    const result = checkAutoResult(testArr);

    //assert
    assert.equal(expected, result);
});

test('checking 124', assert => {
    //arrange
    const testArr = [1, 2, 4];
    const expected = false;

    //act
    const result = checkAutoResult(testArr);

    //assert
    assert.equal(expected, result);
});