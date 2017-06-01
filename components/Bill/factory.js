import Bill from './model'

export default function billsFactory(bills, gameTime) {
    if (gameTime % 10000 < 16) {
        bills.push(new Bill(gameTime))
    }
    return bills
}
