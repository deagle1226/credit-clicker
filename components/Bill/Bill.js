import React from 'react'

export default function BillComponent({ bill, payBill }) {
    return (
        <div>
            <header>Bill #{bill.id}</header>
            <b>${bill.amount}</b>
            <div>
                <button onClick={() => payBill(bill, 'cash')}>Pay With Cash</button>
            </div>
        </div>
    )
}
