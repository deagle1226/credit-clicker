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
        <div className="credit-card" onClick={() => select(id)} style={{ border: selected ? '1px solid blue' : 'none'}}>
            <header>Card #{Math.round(card.id)}</header>
            <b>${card.balance} / ${card.limit}</b>
            <div>
                {card.balance > 0 && <button onClick={() => payCard(card, card.balance)}>Pay</button>}
            </div>
            <style jsx>{`
                .credit-card {
                    background: #eee;
                    padding: 10px;
                    margin-bottom: 5px;
                }
            `}</style>
        </div>
    )
}

export default {
    Model: CreditCard,
    factory: CCFactory,
    Component: ({cards, pay, selectActiveCard, activeCardIndex}) => (
        <ol style={{ paddingRight: 15 }}>
            <h4>CREDIT CARDS</h4>
            {map(cards, (creditcard, idx) => {
                return (
                    <CCComponent card={creditcard} key={idx} id={idx} payCard={pay} select={selectActiveCard} selected={activeCardIndex == idx ? true : false}/>
                )
            })}
        </ol>
    )
}
