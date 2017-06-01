import React from 'react'
import map from 'lodash/map'

function BillComponent({ bill, payBill }) {
    return (
        <div>
            <header>Bill #{bill.id}</header>
            <b>${bill.amount}</b>
            <div>
                <button onClick={() => payBill(bill, 'cash')}>Pay With Cash</button>
                <button onClick={() => payBill(bill, 'card')}>Pay With Card</button>
            </div>
        </div>
    )
}

export default function Bills({ bills, pay }) {
    return (
        <ol>
            <h4>BILLS</h4>
            {map(bills, (bill) => {
                return (
                    <BillComponent bill={bill} key={bill.id} payBill={pay} />
                )
            })}
        </ol>
    )
}
