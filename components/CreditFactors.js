import { DAY, HOUR } from '../config'

const severity = {
    excellent: {
        color: "#3DDB93",
        value: 5
    },
    verygood: {
        color: "#0091ff",
        value: 3
    },
    good: {
        color: "#FFD324",
        value: 1
    },
    neutral: {
        color: "#FFD324",
        value: 0
    },
    fair: {
        color: "#ff863b",
        value: -1
    },
    poor: {
        color: "#FF6161",
        value: -2
    },
    verypoor: {
        color: "#FF6161",
        value: -3
    }
}

export default {
    Component: ({cards, gameTime}) => (
        <h4>Impact: {scoreDelta(cards, gameTime)}<br/>
        <div style={{color:utilizationSeverity(cards).color}}>Credit Utilization: {totalCardsUtilization(cards)}%</div>
        <div style={{color:avgCardsAgeSeverity(cards, gameTime).color}}>Avg. Age of Accounts: {Math.round(avgCardsAge(cards, gameTime) / DAY)}</div>
        <div style={{color:numAccountsSeverity(cards).color}}>Number of Accounts: {totalAccounts(cards)}</div>
        </h4>
    )
}

export function scoreDelta(creditcards, currentTime) {
    var delta = 0
    delta += utilizationSeverity(creditcards).value
    delta += avgCardsAgeSeverity(creditcards, currentTime).value
    delta += numAccountsSeverity(creditcards).value
    return delta
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

function utilizationSeverity(creditcards) {
    var cardsUtilization = totalCardsUtilization(creditcards)
    if(cardsUtilization < 10) { return severity.excellent }
    else if(cardsUtilization <= 30) { return severity.verygood }
    else if(cardsUtilization <= 50) { return severity.neutral }
    else if(cardsUtilization <= 75) { return severity.poor }
    else return severity.verypoor
}

function avgCardsAge(creditcards, currentTime) {
    if(creditcards.length == 0) return 0
    var totalTime = 0;
    for(var i=0; i<creditcards.length; i++) {
        totalTime += currentTime - creditcards[i].id
    }
    return totalTime / creditcards.length
}

function avgCardsAgeSeverity(creditcards, currentTime) {
    var creditAge = avgCardsAge(creditcards, currentTime) / DAY
    if(creditAge > 10) { return severity.excellent }
    else if(creditAge > 7) { return severity.verygood }
    else if(creditAge > 5) { return severity.good }
    else if(creditAge > 3) { return severity.neutral }
    else if(creditAge > 2) { return severity.fair }
    else if(creditAge > 1) { return severity.poor }
    else return severity.verypoor
}

function totalAccounts(creditcards) {
    return creditcards.length
}

function numAccountsSeverity(creditcards) {
    var numAccts = totalAccounts(creditcards)
    if(numAccts <= 5) { return severity.poor }
    else if(numAccts <= 10) { return severity.neutral }
    else if(numAccts <= 20) { return severity.verygood }
    else { return severity.excellent }
}
