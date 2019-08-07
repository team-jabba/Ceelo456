import { checkBank } from '../javascript/gameplay/checkBank.js';
// import { bossBankMoney } from '../javascript/gameplay/gameplay.js';

const test = QUnit.test;

QUnit.module('Bank Stuff');

test('checks bank amount and parses it to integer', assert => {
    // arrange
    const span = document.createElement('span');
    span.textContent = '1000';
    const expected = 1000;
    // act
    const result = checkBank(span);

    // assert
    assert.equal(expected, result);
});