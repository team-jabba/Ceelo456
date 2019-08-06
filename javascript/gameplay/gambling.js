export function updateMoney(startMoney, wager, result) {
    if(result === 'win') {
        return startMoney += wager;
    }
    else { return startMoney -= wager; }
}
