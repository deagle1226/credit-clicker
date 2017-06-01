export default class Bill {
    constructor(gameTime) {
        this.id = gameTime
        this.amount = Math.round(gameTime / 1000)
    }
}
