import config from './config'
import util from 'util'

export const defaults = {
  SHOW_HIDDEN: false,
  DEPTH: 5,
  COLOR: true
}

export default function inspect(subject: unknown): string {
  return util.inspect(
    subject,
    config?.inspect?.showHidden || defaults.SHOW_HIDDEN,
    config?.inspect?.depth || defaults.DEPTH,
    config?.inspect?.color || defaults.COLOR
  )
}
