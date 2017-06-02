import { DAY, HOUR } from '../config'

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

export function scoreDelta(creditcards, currentTime) {
    var cardsUtilization = totalCardsUtilization(creditcards)
    var delta = 0
    if(cardsUtilization <= 10) { delta += 3 }
    else if(cardsUtilization <= 30) { delta += 2 }
    else if(cardsUtilization <= 50) { delta += 1 }
    else if(cardsUtilization <= 70) { delta += 0 }
    else if(cardsUtilization <= 80) { delta += -1 }
    else if(cardsUtilization <= 90) { delta += -2 }
    else delta += -3

    var creditAge = avgCardsAge(creditcards, currentTime) / DAY
    if(creditAge > 10) { delta += 3 }
    else if(creditAge > 7) { delta += 2 }
    else if(creditAge > 5) { delta += 1 }
    else if(creditAge > 3) { delta += 0 }
    else if(creditAge > 2) { delta += -1 }
    else if(creditAge > 1) { delta += -2 }
    else delta += -3

    console.log("credit change " + delta)
    return delta
}

export function avgCardsAge(creditcards, currentTime) {
    if(creditcards.length == 0) return 0
    var totalTime = 0;
    for(var i=0; i<creditcards.length; i++) {
        totalTime += currentTime - creditcards[i].id
    }
    return totalTime / creditcards.length
}
