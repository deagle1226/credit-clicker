export const HOUR = 500
export const DAY = HOUR * 24

function segments(timestamp) {
    let time = timestamp
    const days = Math.floor(time / DAY)
    time = time - (days * DAY)
    const hours = Math.round(time / HOUR)
    return { days, hours }
}

export function timeleft(timestamp) {
    const { days, hours } = segments(timestamp)
    return `${days} day${days !== 1 ? 's' : ''}, ${hours} hour${hours !== 1 ? 's' : ''}`
}

export function date(timestamp) {
    const { days, hours } = segments(timestamp)
    return `Day ${days}, Hour ${hours}`
}

export function daily(timestamp, callback) {
    if (timestamp % DAY < 16) callback()
}
