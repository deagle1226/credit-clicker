const DAY = 1000

export default class Bill {
    constructor(gameTime) {
        this.id = gameTime
        this.amount = Math.round(gameTime / 1000)
        this.due = gameTime + (30 * DAY)
    }
}
