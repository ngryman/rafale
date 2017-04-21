import collectSlots from './collect-slots'
import dispatchSlots from './dispatch-slots'
import parseDOM from './parse-dom'
import { createComponent } from '../../core/component'

const components = {}

const getUid = (parts) => parts[parts.length / 2 | 0]

export function registerComponent(parts) {
  const uid = getUid(parts)

  let component = components[uid]
  if (!component) {
    const placeholder = '🦄'
    // TODO: pipe
    // TODO: move elsewhere?
    const markup = dispatchSlots(parts, placeholder)
    const template = parseDOM(markup)
    const slots = collectSlots(template, placeholder)
    component = createComponent(uid, template, slots)
    components[uid] = component
  }

  return component
}
