import { getPoints } from './getPoints.js';
import { checkForPair } from './checkForPair.js';


export function checkAutoResult(array) {
    if(array.includes(4) && array.includes(5) && array.includes(6)) {
        return 'Auto Win: 4, 5, 6';
    } else if(array.includes(1) && array.includes(2) && array.includes(3)) {
        return 'Auto Lose: 1, 2, 3';
    } else if(checkForPair(array) === getPoints(array)) {
        return 'Auto Win: Three-of-a-Kind';
    } else if(getPoints(array)===6){
        return 'Auto Win: 6 Points';
    } else { return false; }
}