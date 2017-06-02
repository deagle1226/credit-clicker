import React from 'react'
import map from 'lodash/map'

class Offer {
    constructor(limit, rate, minScore, gameTime) {
        this.id = gameTime;
        this.interestRate = rate;
        this.limit = limit;
        this.minScore = minScore;
    }
}

function OfferFactory(offers, limit, rate, minScore, gameTime) {
    offers.push(new Offer(limit, rate, minScore, gameTime))
    return offers;
}

function OfferComponent({offer, apply, score}) {
    if(offer.minScore - 50 < score) {
        
    }

    return (
        <div>
            <header>Card</header>
            <b>Limit: ${offer.limit}, Interest Rate: {offer.interestRate}%</b>
            <div>
                <button onClick={() => apply(offer)}>Apply</button>
            </div>
        </div>
    )
}

export default {
    Model: Offer,
    factory: OfferFactory,
    Component: ({offers, apply, score}) => (
        <ol>
            <h3>Offers</h3>
            {map(offers, (offer, idx) => {
                return (
                    <OfferComponent offer={offer} apply={apply} score={score} key={idx} />
                )
            })}
        </ol>
    )
}
