export function totalCardsUtilization(creditcards) {
    var balanceSum = 0;
    var limitSum = 0;
    for (var i = 0; i < creditcards.length; i++) {
        balanceSum += creditcards[i].balance
        limitSum += creditcards[i].limit
    }
    if(limitSum == 0) {
        return 0
    }
    return Math.round(balanceSum/limitSum*100);
}

export function scoreDelta(creditcards) {
    var cardsUtilization = totalCardsUtilization(creditcards)
    if(cardsUtilization <= 10) { return 3 }
    else if(cardsUtilization <= 30) { return 2 }
    else if(cardsUtilization <= 50) { return 1 }
    else if(cardsUtilization <= 70) { return 0 }
    else if(cardsUtilization <= 80) { return -1 }
    else if(cardsUtilization <= 90) { return -2 }
    return -3
}
