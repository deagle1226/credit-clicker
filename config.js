export const HOUR = 500
export const DAY = HOUR * 24

export default {
    bill: {
        spawnRate: DAY * 0.4,
        amount: (gameTime) => Math.round(gameTime / 500),
        due: (gameTime) => gameTime + (12 * HOUR)
    }
}
