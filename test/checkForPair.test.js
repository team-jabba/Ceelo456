import { checkForPair } from '../javascript/gameplay/checkForPair.js';

const test = QUnit.test;

QUnit.module('Check for pair');

test('checking for pair', assert => {
    //arrange
    const testArr = [2, 2, 3];
    const expected = 2;

    //act
    const result = checkForPair(testArr);

    //assert
    assert.equal(expected, result);
});

test('checking for no pair', assert => {
    //arrange
    const testArr = [2, 5, 3];
    const expected = false;

    //act
    const result = checkForPair(testArr);

    //assert
    assert.equal(expected, result);
});

test('checking for three of kind', assert => {
    //arrange
    const testArr = [2, 2, 2];
    const expected = 2;

    //act
    const result = checkForPair(testArr);

    //assert
    assert.equal(expected, result);
});