import hash from 'string-hash'

import { createComponent } from './component'
import {
  collectSlots,
  dispatchSlots,
  parseDOM
} from '../parsing'

const components = new Map()

export function registerComponent(parts) {
  const uid = hash(parts[0])

  let component = components.get(uid)
  if (!component) {
    const placeholder = '{🦄}'
    // TODO: pipe
    // TODO: move elsewhere?
    const markup = dispatchSlots(parts, placeholder)
    const fragment = parseDOM(markup)
    const slots = collectSlots(fragment, placeholder)
    component = createComponent(uid, fragment, slots)
    components.set(uid, component)
  }

  return component
}
