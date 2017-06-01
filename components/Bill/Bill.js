import React from 'react'
import map from 'lodash/map'

class BillComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.bill.due - nextProps.gameTime < 0) {
            this.props.defect(this.props.bill)
        }
    }

    render() {
        const { bill, payBill, gameTime } = this.props
        return (
            <div>
                <header>Bill #{bill.id}</header>
                <div><b>${bill.amount}</b> due in {bill.due - gameTime}</div>
                <div>
                    <button onClick={() => payBill(bill, 'cash')}>Pay With Cash</button>
                </div>
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
