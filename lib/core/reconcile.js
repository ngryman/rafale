import {
  appendChild,
  cloneTemplate,
  createFragment,
  createTextNode,
  findNode,
  replaceNode,
  setNodeText,
  setNodeAttribute
} from './dom'

const updaters = [
  setNodeText,
  setNodeAttribute
]

export function injectPrimitive(node, element) {
  return replaceNode(createTextNode(node.data.value), element)
}

export function updatePrimitive(node, element, slot) {
  updaters[slot.type](element, slot.name || node.data.value, node.data.value)
}

export function addToSequence(nodes, element) {
  const fragment = createFragment()
  for (let i = 0, length = nodes.length; i < length; i++) {
    const node = nodes[i]
    node.element = injectComponent(node, fragment, true)
  }
  element.appendChild(fragment)
}

export function injectSequence(node, element) {
  const parentNode = element.parentNode
  addToSequence(node.children, parentNode)
  element.remove()
  return parentNode
}

const slotInjectors = [
  updatePrimitive,  // VNODE_PRIMITIVE
  injectSequence,   // VNODE_SEQUENCE
  injectComponent   // VNODE_COMPONENT
]

export function injectComponent(node, element, insert) {
  const { template, slots } = node.component
  const rootElement = cloneTemplate(template)

  for (let i = 0, length = slots.length; i < length; i++) {
    const slot = slots[i]
    const slotNode = node.children[i]
    const element = findNode(rootElement, slot.path)
    slotNode.element = slotInjectors[slotNode.type](slotNode, element, slot) || element
    slotNode.slot = slot
  }

  if (insert) {
    appendChild(element, rootElement)
  }
  else {
    replaceNode(rootElement, element)
  }

  return rootElement
}
