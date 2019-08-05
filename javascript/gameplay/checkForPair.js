
const array = [4, 5, 5];
export const checkForPair = function(array) {

    let flag = 0;
    for(let i = 0; i < array.length; i++) {
        const firstNumber = array[i];
        for(let j = 0; j < array.length; j++) {
            if(i !== j) {
                const secondNumber = array[j];
                if(firstNumber === secondNumber) {
                    return firstNumber;
                }
            }
        }
    }
    if(flag === 0) {
        return false;
    }
};