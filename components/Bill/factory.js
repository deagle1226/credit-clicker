import Bill from './model'
import { DAY } from '../../utils/time'

export default function billsFactory(bills, gameTime) {
    if (gameTime % (DAY * 0.1) < 16) {
        bills.push(new Bill(gameTime))
    }
    return bills
}
