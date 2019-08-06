import { updateMoney } from '../javascript/gameplay/gambling.js';

const test = QUnit.test;

QUnit.module('gambling');

test('gambling money win result', assert => {
    //arrange
    const startMoney = 2000;
    const wager = 50;
    const result = 'win';
    const expected = 2050;
    //act
    
    const got = updateMoney(startMoney, wager, result);

    //assert
    assert.equal(expected, got);
});

test('gambling money lose result', assert => {
    //arrange
    const startMoney = 2000;
    const wager = 50;
    const result = 'lose';
    const expected = 1950;
    //act
    
    const got = updateMoney(startMoney, wager, result);

    //assert
    assert.equal(expected, got);
});
