import { DAY, HOUR } from '../config'

function segments(timestamp) {
    let time = timestamp
    const days = Math.floor(time / DAY)
    time = time - (days * DAY)
    const hours = Math.round(time / HOUR)
    return { days, hours }
}

export function timeleft(timestamp) {
    const { days, hours } = segments(timestamp)
    if (days >= 0) return `${days} day${days !== 1 ? 's' : ''}, ${hours} hour${hours !== 1 ? 's' : ''}`
    return `${Math.abs(days)} day${Math.abs(days) !== 1 ? 's' : ''} ago`
}

export function date(timestamp) {
    const { days, hours } = segments(timestamp)
    return `Day ${days}, Hour ${hours}`
}

export function daily(timestamp, callback) {
    if (timestamp % DAY < 16.7) callback()
}
