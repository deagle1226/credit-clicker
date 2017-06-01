import React, { Component } from 'react'
import Bill from './Bill'
import map from 'lodash/map'
import reduce from 'lodash/reduce'
import remove from 'lodash/remove'

class CreditCard {
    constructor() {
        this.amount = 1000;
    }
}

function CCFactory(creditcards) {
    creditcards.push(new CreditCard())
    return creditcards;
}

export default class GameState extends Component {
    constructor(props) {
        super(props)
        this.state = {
            credit: {
                score: 500
            },
            finances: {
                cash: 1000
            },
            job: {
                wage: 10
            },
            bills: [],
            cards: []
        }
        this.updateCredit = this.updateCredit.bind(this)
        this.updateFinances = this.updateFinances.bind(this)
        this.startNewCard = this.startNewCard.bind(this)
        this.payBill = this.payBill.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        const bills = Bill.factory(this.state.bills, nextProps.gameTime)
        this.setState({ bills })
    }

    updateCredit(key, delta) {
        this.setState({ credit: { [key]: this.state.credit[key] + delta } })
    }

    updateFinances(key, delta) {
        this.setState({ finances: { [key]: this.state.finances[key] + delta } })
    }

    startNewCard() {
        const cards = CCFactory(this.state.cards)
    }

    payBill(bill, method) {
        if (method === 'cash') {
            this.updateFinances('cash', -bill.amount)
        }
        const bills = this.state.bills
        remove(bills, b => b.id === bill.id)
        this.setState({ bills })
    }

    total(amounts) {
        return reduce(amounts, (result, amount) => result + amount, 0)
    }

    render() {
        const { credit, finances, bills, cards } = this.state
        const { gameTime, children } = this.props
        return (
            <div>
                <header>
                    <h2>Credit Score: {credit.score}</h2>
                    <h2>${this.total(finances)}</h2>
                </header>
                <div>
                    <aside>
                        <ol>
                            {map(cards, (creditcard, idx) => {
                                return (
                                    <li key={idx}>${creditcard.amount}</li>
                                )
                            })}
                        </ol>
                    </aside>
                    {children(this.state, this.updateCredit, this.updateFinances, this.startNewCard)}
                </div>
                <footer>
                    <Bill.Component bills={bills} pay={this.payBill} />
                </footer>
            </div>
        )
    }
}
