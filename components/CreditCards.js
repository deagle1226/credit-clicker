import React from 'react'
import map from 'lodash/map'

class CreditCard {
    constructor(gameTime, limit) {
        this.id = gameTime;
        this.balance = 0;
        this.limit = limit;
    }

    addBalance(amount) {
        if(this.limit >= this.balance + amount) {
            this.balance += amount;
            return true;
        }
        return false;
    }

    payBalance(amount) {
        if(this.balance >= amount) {
            this.balance -= amount;
        }
    }

}

function CCFactory(creditcards, gameTime, limit) {
    creditcards.push(new CreditCard(gameTime, limit))
    return creditcards;
}

function CCComponent({card, id, payCard, select, selected}) {
    return (
        <div onClick={() => select(id)} style={{ border: selected ? '1px solid blue' : 'none'}}>
            <header>Card #{card.id}</header>
            <b>${card.balance} / ${card.limit}</b>
            <div>
                <button onClick={() => payCard(card, card.balance)}>Pay</button>
            </div>
        </div>
    )
}

export default {
    Model: CreditCard,
    factory: CCFactory,
    Component: ({cards, pay, selectActiveCard, activeCardIndex}) => (
        <ol>
            <h3>Credit Cards</h3>
            {map(cards, (creditcard, idx) => {
                return (
                    <CCComponent card={creditcard} key={idx} id={idx} payCard={pay} select={selectActiveCard} selected={activeCardIndex == idx ? true : false}/>
                )
            })}
        </ol>
    )
}
