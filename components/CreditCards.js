import React from 'react'
import map from 'lodash/map'

class CreditCard {
    constructor() {
        this.amount = 1000;
    }
}

function CCFactory(creditcards) {
    creditcards.push(new CreditCard())
    return creditcards;
}

export default {
    Model: CreditCard,
    factory: CCFactory,
    Component: ({cards}) => (
        <ol>
            <h3>Credit Cards</h3>
            {map(cards, (creditcard, idx) => {
                return (
                    <li key={idx}>${creditcard.amount}</li>
                )
            })}
        </ol>
    )
}
