import Slot, { SLOT_ELEMENT, SLOT_ATTRIBUTE } from '../../core/slot'

export default function collectSlots(template, placeholder) {
  const slots = []
  const stack = [template.content.firstElementChild]
  const path = [-1]
  const dummy = document.createElement('_')

  while (0 !== stack.length) {
    const node = stack.pop()

    if (node.isSameNode(dummy)) {
      path.pop()
      continue
    }

    path[path.length - 1]++

    if (3 === node.nodeType) continue

    // TODO: no magic value, move licorn somewhere
    if (node.content && '🦄' === node.content.firstChild.nodeValue) {
      node.parentNode.replaceChild(document.createTextNode(''), node)
      slots.push(new Slot(SLOT_ELEMENT, null, path.slice(1)))
      continue
    }

    for (let i = 0; i < node.attributes.length; i++) {
      const attribute = node.attributes[i]
      if (attribute.value === placeholder) {
        slots.push(new Slot(SLOT_ATTRIBUTE, null, attribute.name, path.slice(1)))
      }
    }

    if (0 !== node.children.length) {
      stack.push(dummy)
      for (let i = node.childNodes.length - 1; i >= 0; i--) {
        stack.push(node.childNodes[i])
      }
      path.push(-1)
    }
  }

  return slots
}
