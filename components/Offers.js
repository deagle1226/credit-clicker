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
    var odds = "Poor"
    if(offer.minScore + 100 < score) {
        odds = "Excellent"
    } else if(offer.minScore < score) {
        odds = "Good"
    } else if(offer.minScore - 50 < score) {
        odds = "Fair"
    }
    return (
        <div className="offer">
            <header>Card</header>
            <b>Limit: ${offer.limit}, Interest Rate: {offer.interestRate}%</b>
            <div>
                <button onClick={() => apply(offer)}>{odds}</button>
            </div>
            <style jsx>{`
                .offer {
                    background: #fff;
                    display: inline-block;
                    margin: 5px;
                    padding: 5px;
                    border: 1px solid #000;
                    width: 20%;
                }
            `}</style>
        </div>
    )
}

export default {
    Model: Offer,
    factory: OfferFactory,
    Component: ({offers, apply, score}) => (
        <ol>
            <h4>OFFERS</h4>
            {map(offers, (offer, idx) => {
                return (
                    <OfferComponent offer={offer} apply={apply} score={score} key={idx} />
                )
            })}
        </ol>
    )
}
