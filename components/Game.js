import React, { Component } from 'react'
import Bill from './Bill'
import CreditCards from './CreditCards'
import map from 'lodash/map'
import reduce from 'lodash/reduce'
import remove from 'lodash/remove'

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
            cards: [],
        }
        this.updateCredit = this.updateCredit.bind(this)
        this.updateFinances = this.updateFinances.bind(this)
        this.startNewCard = this.startNewCard.bind(this)
        this.payBill = this.payBill.bind(this)
        this.payCardBalance = this.payCardBalance.bind(this)
        this.defectBill = this.defectBill.bind(this)
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
        const cards = CreditCards.factory(this.state.cards, this.props.gameTime, 1000)
    }

    payBill(bill, method) {
        if (method === 'cash') {
            this.updateFinances('cash', -bill.amount)
        }
        if(method === 'card') {
            this.state.cards[0].addBalance(bill.amount)
        }
        const bills = this.state.bills
        remove(bills, b => b.id === bill.id)
        this.setState({ bills })
    }

    defectBill(bill) {
        const bills = this.state.bills
        remove(bills, b => b.id === bill.id)
        const score = this.state.credit.score - (bill.amount / 10)
        this.setState({ bills, credit: { score } })
    }

    total(amounts) {
        return reduce(amounts, (result, amount) => result + amount, 0)
    }

    payCardBalance(card, amount) {
        card.payBalance(amount)
        this.updateFinances('cash', -amount)
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
                        <CreditCards.Component cards={cards} pay={this.payCardBalance}/>
                    </aside>
                    {children(this.state, this.updateCredit, this.updateFinances, this.startNewCard)}
                </div>
                <footer>
                    <Bill.Component bills={bills} pay={this.payBill} defect={this.defectBill} gameTime={gameTime} />
                </footer>
            </div>
        )
    }
}
