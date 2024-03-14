import { isError } from './util'
// Helpers.
const s = 1000
const m = s * 60
const h = m * 60
const d = h * 24
const w = d * 7
const y = d * 365.25

/**
 * Parse or format the given `val`.
 *
 * @param value - The string or number to convert
 * @param options - Options for the conversion
 * @throws Error if `value` is not a non-empty string or a number
 */

function ms(value: string | number, options?: { long: boolean }) {
  try {
    if (typeof value === 'string' && value.length > 0) {
      return parse(value)
    } else if (typeof value === 'number' && isFinite(value)) {
      return options?.long ? fmtLong(value) : fmtShort(value)
    }
    throw new Error('Value is not a string or number.')
  } catch (error) {
    const message = isError(error)
      ? `${error.message}. value=${JSON.stringify(value)}`
      : 'An unknown error has occured.'
    throw new Error(message)
  }
}
/**
 * Parse the given `str` and return milliseconds.
 */
function parse(str: string) {
  str = String(str)
  if (str.length > 100) {
    throw new Error('Value exceeds the maximum length of 100 characters.')
  }
  const match =
    /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
      str
    )
  if (!match) {
    return NaN
  }
  const n = parseFloat(match[1])
  const type = (match[2] || 'ms').toLowerCase()
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y
    case 'weeks':
    case 'week':
    case 'w':
      return n * w
    case 'days':
    case 'day':
    case 'd':
      return n * d
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n
    default:
      // This should never occur.
      throw new Error(
        `The unit ${type} was matched, but no matching case exists.`
      )
  }
}
export default ms
/**
 * Short format for `ms`.
 */
function fmtShort(ms: number) {
  const msAbs = Math.abs(ms)
  if (msAbs >= d) {
    return `${Math.round(ms / d)}d`
  }
  if (msAbs >= h) {
    return `${Math.round(ms / h)}h`
  }
  if (msAbs >= m) {
    return `${Math.round(ms / m)}m`
  }
  if (msAbs >= s) {
    return `${Math.round(ms / s)}s`
  }
  return `${ms}ms`
}
/**
 * Long format for `ms`.
 */
function fmtLong(ms: number) {
  const msAbs = Math.abs(ms)
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day')
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour')
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute')
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second')
  }
  return `${ms} ms`
}
/**
 * Pluralization helper.
 */
function plural(ms: number, msAbs: number, n: number, name: string) {
  const isPlural = msAbs >= n * 1.5
  return `${Math.round(ms / n)} ${name}${isPlural ? 's' : ''}`
}
