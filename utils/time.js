export const HOUR = 500
export const DAY = HOUR * 24

function segments(timestamp) {
    let time = timestamp
    const days = Math.round(time / DAY)
    time = time - (days * DAY)
    const hours = Math.round(time / HOUR) + 12
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
