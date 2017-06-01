import config from '../../config'

export default class Bill {
    constructor(gameTime) {
        this.id = gameTime
        this.amount = config.bill.amount(gameTime)
        this.due = config.bill.due(gameTime)
    }
}
