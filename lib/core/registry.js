import hash from 'string-hash'

import { createComponent } from './component'
import {
  collectSlots,
  dispatchSlots,
  parseDOM
} from '../parsing'

const components = new Map()

export function registerComponent(parts) {
  const uid = hash(parts[0] + parts[parts.length / 2 | 0] + parts[parts.length - 1])

  let component = components.get(uid)
  if (!component) {
    const placeholder = '🦄'
    // TODO: pipe
    // TODO: move elsewhere?
    const markup = dispatchSlots(parts, placeholder)
    const template = parseDOM(markup)
    const slots = collectSlots(template, placeholder)
    component = createComponent(uid, template, slots)
    components.set(uid, component)
  }

  return component
}
