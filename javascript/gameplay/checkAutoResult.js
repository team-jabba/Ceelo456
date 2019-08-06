import { getPoints } from './getPoints.js';
import { checkForPair } from './checkForPair.js';


export function checkAutoResult(array) {
    if(array.includes(4) && array.includes(5) && array.includes(6)) {
        return 'win';
    } else if(array.includes(1) && array.includes(2) && array.includes(3)) {
        return 'lose';
    } else if(checkForPair(array) === getPoints(array)) {
        return 'win';
    } else if(getPoints(array) === 6) {
        return 'win';
    } else { return false; }
}