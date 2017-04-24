import {
  appendChild,
  cloneTemplate,
  createFragment,
  createText,
  select,
  replace,
  setText,
  setAttribute
} from './dom'

const updaters = [
  setText,
  setAttribute
]

export function injectPrimitive(node, domNode) {
  return replace(createText(node.data.value), domNode)
}

export function updatePrimitive(node, domNode, slot) {
  updaters[slot.type](domNode, slot.name || node.data.value, node.data.value)
}

export function addToSequence(nodes, domNode) {
  const fragment = createFragment()
  for (let i = 0, length = nodes.length; i < length; i++) {
    const node = nodes[i]
    node.domNode = injectComponent(node, fragment, true)
  }
  domNode.appendChild(fragment)
}

export function injectSequence(node, domNode) {
  const parentNode = domNode.parentNode
  addToSequence(node.children, parentNode)
  domNode.remove()
  return parentNode
}

const slotInjectors = [
  updatePrimitive,  // VNODE_PRIMITIVE
  injectSequence,   // VNODE_SEQUENCE
  injectComponent   // VNODE_COMPONENT
]

export function injectComponent(node, domNode, insert) {
  const { template, slots } = node.component
  const rootDomNode = cloneTemplate(template)

  for (let i = 0, length = slots.length; i < length; i++) {
    const slot = slots[i]
    const slotNode = node.children[i]
    const domNode = select(rootDomNode, slot.path)
    slotNode.domNode = slotInjectors[slotNode.type](slotNode, domNode, slot) || domNode
    slotNode.slot = slot
  }

  if (insert) {
    appendChild(domNode, rootDomNode)
  }
  else {
    replace(rootDomNode, domNode)
  }

  return rootDomNode
}
