import React, { Component } from 'react'
import map from 'lodash/map'

class Bill {
    constructor(gameTime) {
        this.amount = Math.round(gameTime / 1000)
    }
}

function billsFactory(bills, gameTime) {
    if (gameTime % 10000 < 16) {
        bills.push(new Bill(gameTime))
    }
    return bills
}

export default class GameState extends Component {
    constructor(props) {
        super(props)
        this.state = {
            credit: {
                score: 500
            },
            finances: {
                total: 1000
            },
            bills: [],
            cards: []
        }
        this.updateCredit = this.updateCredit.bind(this)
        this.updateFinances = this.updateFinances.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        const bills = billsFactory(this.state.bills, nextProps.gameTime)
        this.setState({ bills })
    }

    updateCredit(key, delta) {
        this.setState({ credit: { [key]: this.state.credit[key] + delta } })
    }

    updateFinances(key, delta) {
        this.setState({ finances: { [key]: this.state.finances[key] + delta } })
    }

    render() {
        const { credit, finances, bills } = this.state
        const { gameTime, children } = this.props
        return (
            <div>
                <header>
                    <h2>Credit Score: {credit.score}</h2>
                    <h2>${finances.total}</h2>
                </header>
                {children(this.updateCredit, this.updateFinances)}
                <footer>
                    <ol>
                        {map(bills, (bill, idx) => {
                            return (
                                <li key={idx}>${bill.amount}</li>
                            )
                        })}
                    </ol>
                </footer>
            </div>
        )
    }
}
