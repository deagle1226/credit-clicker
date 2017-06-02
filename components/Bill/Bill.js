import React from 'react'
import map from 'lodash/map'
import { timeleft, daily } from '../../utils/time'

class BillComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillReceiveProps(nextProps) {
        daily(nextProps.gameTime, () => {
            if (this.props.bill.due - nextProps.gameTime < 0) {
                setTimeout(() => this.props.defect(this.props.bill), 1)
            }
        })
    }

    render() {
        const { bill, payBill, gameTime } = this.props
        const timeLeft = bill.due - gameTime
        return (
            <div style={{ color: timeLeft > 0 ? 'black' : 'red' }} className="bill">
                <header>Bill #{bill.id}</header>
                <div><b>${bill.amount}</b> due in {timeleft(timeLeft)}</div>
                <div>
                    <button onClick={() => payBill(bill, 'cash')}>Pay With Cash</button>
                    <button onClick={() => payBill(bill, 'card')}>Pay With Card</button>
                </div>
                <style jsx>{`
                    .bill {
                        background: #fff;
                        display: inline-block;
                        margin: 5px;
                        padding: 5px;
                        border: 1px solid #000;
                        width: 30%;
                    }
                `}</style>
            </div>
        )
    }
}

export default function Bills({ bills, pay, defect, gameTime }) {
    return (
        <ol>
            <h4>BILLS</h4>
            {map(bills, (bill) => {
                return (
                    <BillComponent bill={bill} key={bill.id} payBill={pay} defect={defect} gameTime={gameTime} />
                )
            })}
        </ol>
    )
}
