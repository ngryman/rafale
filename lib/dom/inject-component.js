import updatePrimitive from './update-primitive'
import injectSequence from './inject-sequence'

const slotInjectors = [
  updatePrimitive,  // VNODE_PRIMITIVE
  injectSequence,   // VNODE_SEQUENCE
  injectComponent   // VNODE_COMPONENT
]

export default function injectComponent(node, element, insert) {
  const { template, slots } = node.component
  const rootElement = document.importNode(template.content, true).firstElementChild

  for (let i = 0, length = slots.length; i < length; i++) {
    const slot = slots[i]
    const slotNode = node.children[i]
    const element = slot.select(rootElement)

    slotNode.element = slotInjectors[slotNode.type](slotNode, element, slot) || element
    slotNode.slot = slot
  }

  if (insert) {
    return element.parentNode.appendChild(rootElement)
  }
  element.parentNode.replaceChild(rootElement, element)
  return rootElement
}
