import { DAY, HOUR } from '../../utils/time'

export default class Bill {
    constructor(gameTime) {
        this.id = gameTime
        this.amount = Math.round(gameTime / 500)
        this.due = gameTime + (12 * HOUR)
    }
}
