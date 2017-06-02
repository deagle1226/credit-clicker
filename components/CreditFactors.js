import { DAY, HOUR } from '../config'

export default {
    Component: ({cards, gameTime}) => (
        <h4>Impact: {scoreDelta(cards, gameTime)}<br/>
        Credit Utilization: {totalCardsUtilization(cards)}%<br/>
        Avg. Age of Accounts: {Math.round(avgCardsAge(cards, gameTime) / DAY)}<br/>
        Number of Accounts: {totalAccounts(cards)}
        </h4>
    )
}

function totalCardsUtilization(creditcards) {
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
    if(cardsUtilization < 10) { delta += 3 }
    else if(cardsUtilization <= 30) { delta += 2 }
    else if(cardsUtilization <= 50) { delta += 0 }
    else if(cardsUtilization <= 75) { delta += -1 }
    else delta += -3

    var creditAge = avgCardsAge(creditcards, currentTime) / DAY
    if(creditAge > 10) { delta += 3 }
    else if(creditAge > 7) { delta += 2 }
    else if(creditAge > 5) { delta += 1 }
    else if(creditAge > 3) { delta += 0 }
    else if(creditAge > 2) { delta += -1 }
    else if(creditAge > 1) { delta += -2 }
    else delta += -3

    var numAccts = totalAccounts(creditcards)
    if(numAccts <= 5) { delta += -2 }
    else if(numAccts <= 10) { delta += 0 }
    else if(numAccts <= 20) { delta += 2 }
    else { delta += 3 }

    console.log("credit change " + delta)
    return delta
}

function avgCardsAge(creditcards, currentTime) {
    if(creditcards.length == 0) return 0
    var totalTime = 0;
    for(var i=0; i<creditcards.length; i++) {
        totalTime += currentTime - creditcards[i].id
    }
    return totalTime / creditcards.length
}

function totalAccounts(creditcards) {
    return creditcards.length
}
