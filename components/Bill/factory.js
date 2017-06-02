import Bill from './model'
import config from '../../config'

export default function billsFactory(bills, gameTime) {
    if (gameTime % (config.bill.spawnRate) < 16) {
        bills.push(new Bill(gameTime))
    }
    return bills
}
