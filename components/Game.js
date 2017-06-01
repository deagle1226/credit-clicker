import React, { Component } from 'react'
import ScoreDial from '@ck/score-dial'
import { RATINGS } from '@ck/score-dial/lib/constants'
import Bill from './Bill'
import CreditCards from './CreditCards'
import Job from './Job'
import Layout from './Layout'
import { daily } from '../utils/time'
import { MinimumWageEarner } from '../content/jobs'
import map from 'lodash/map'
import reduce from 'lodash/reduce'
import remove from 'lodash/remove'
import find from 'lodash/find'
import inRange from 'lodash/inRange'

export default class GameState extends Component {
    constructor(props) {
        super(props)
        this.state = {
            credit: {
                score: 650
            },
            finances: {
                cash: 1000
            },
            job: MinimumWageEarner,
            bills: [],
            cards: [],
            activeCard: null,
        }
        this.updateCredit = this.updateCredit.bind(this)
        this.updateFinances = this.updateFinances.bind(this)
        this.updateJob = this.updateJob.bind(this)
        this.startNewCard = this.startNewCard.bind(this)
        this.payBill = this.payBill.bind(this)
        this.payCardBalance = this.payCardBalance.bind(this)
        this.defectBill = this.defectBill.bind(this)
        this.selectActiveCard = this.selectActiveCard.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        const bills = Bill.factory(this.state.bills, nextProps.gameTime)
        this.setState({ bills })
        daily(nextProps.gameTime, () => {
            this.updateFinances('cash', this.state.job.salary)
        })
    }

    updateCredit(key, delta) {
        this.setState({ credit: { [key]: this.state.credit[key] + delta } })
    }

    updateFinances(key, delta) {
        this.setState({ finances: { [key]: this.state.finances[key] + delta } })
    }

    updateJob(promotion) {
        if (promotion.cost.credit && promotion.cost.credit > this.state.credit.score) {
            return
        }
        if (promotion.cost.cash > this.state.finances.cash) {
            return
        }
        this.updateFinances('cash', -promotion.cost.cash)
        promotion.start = this.props.gameTime
        promotion.end = promotion.start + promotion.cost.time
        setTimeout(() => {
            this.setState({ job: promotion.job })
        }, promotion.cost.time)
    }

    startNewCard() {
        const cards = CreditCards.factory(this.state.cards, this.props.gameTime, 1000)
    }

    payBill(bill, method) {
        var success = false
        if (method === 'cash') {
            this.updateFinances('cash', -bill.amount)
            success = true
        }
        if(method === 'card' && this.state.activeCard != null) {
            var card = this.state.cards[this.state.activeCard]
            if(card.limit - card.balance >= bill.amount) {
                card.addBalance(bill.amount)
                success = true
            }
        }
        if(success) {
            const bills = this.state.bills
            remove(bills, b => b.id === bill.id)
            this.setState({ bills })
        }
    }

    defectBill(bill) {
        const bills = this.state.bills
        remove(bills, b => b.id === bill.id)
        const score = Math.round(this.state.credit.score - (bill.amount / 10))
        this.setState({ credit: { score } })
    }

    total(amounts) {
        return reduce(amounts, (result, amount) => result + amount, 0)
    }

    payCardBalance(card, amount) {
        card.payBalance(amount)
        this.updateFinances('cash', -amount)
    }

    selectActiveCard(index) {
        this.state.activeCard = index;
    }

    render() {
        const { credit, finances, job, bills, cards } = this.state
        const { gameTime, children } = this.props
        if (credit.score < 300) {
            return (
                <h1>Game Over</h1>
            )
        }
        const scoreBand = find(RATINGS, rating => inRange(credit.score, rating.range[0], rating.range[1] + 1))
        return (
            <div>
                <Layout
                    head={(
                        <div className="header">
                            <ScoreDial score={{ value: credit.score, label: scoreBand.text }} width="140px" />
                            <h2>Bank: ${this.total(finances)}</h2>
                        </div>
                    )}
                    side={(
                        <div>
                            <CreditCards.Component cards={cards} pay={this.payCardBalance} selectActiveCard={this.selectActiveCard} activeCardIndex={this.state.activeCard}/>
                            <button onClick={this.startNewCard}>
                                New Card
                            </button>
                        </div>
                    )}
                    body={(
                        <Job.Component job={job} updateFinances={this.updateFinances} updateJob={this.updateJob} gameTime={gameTime} />
                    )}
                    foot={(
                        <Bill.Component bills={bills} pay={this.payBill} defect={this.defectBill} gameTime={gameTime} />
                    )}
                />
                <style jsx>{`
                    .header {
                        display: flex;
                        flex-direction: row;
                        justify-content: space-around;
                        align-items: center;
                    }
                `}</style>
            </div>
        )
    }
}
