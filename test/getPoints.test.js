import { getPoints } from '../javascript/gameplay/getPoints.js';

const test = QUnit.test;

QUnit.module('getPoints');

test('getting points for roll', assert => {
    //arrange
    const testArr = [2, 2, 4];
    const expected = 4;
    //act
    const result = getPoints(testArr);
    //assert
    assert.equal(expected, result);
});

test('getting points for roll of 1', assert => {
    //arrange
    const testArr = [2, 2, 1];
    const expected = 1;
    //act
    const result = getPoints(testArr);
    //assert
    assert.equal(expected, result);
});

test('getting points for roll of 6', assert => {
    //arrange
    const testArr = [2, 6, 2];
    const expected = 6;
    //act
    const result = getPoints(testArr);
    //assert
    assert.equal(expected, result);
});

test('getting points for roll of 456', assert => {
    //arrange
    const testArr = [4, 5, 6];
    const expected = 0;
    //act
    const result = getPoints(testArr);
    //assert
    assert.equal(expected, result);
});

test('getting points for roll of 123', assert => {
    //arrange
    const testArr = [1, 2, 3];
    const expected = 0;
    //act
    const result = getPoints(testArr);
    //assert
    assert.equal(expected, result);
});