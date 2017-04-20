function injectElementPrimitive(node, element) {
  element.nodeValue = node.data.value
}

function injectElementComponent(node, element) {
  return inject(node, element, false)
}

function injectElementSequence(node, element) {
  for (let i = 0, length = node.children.length; i < length; i++) {
    const child = node.children[i]
    child.element = inject(child, element, true)
  }
  const nodeElement = (element.parentNode || node.parent.element)
  element.remove()
  return nodeElement
}

const elementInjectors = [
  injectElementPrimitive, // VNODE_PRIMITIVE
  injectElementSequence,  // VNODE_SEQUENCE
  injectElementComponent  // VNODE_COMPONENT
]

function injectElement(node, element) {
  return elementInjectors[node.type](node, element)
}

function injectAttribute(node, element) {
  const { value } = node.data
  if ('function' === typeof value) {
    element[name] = value
  }
  else {
    element.setAttribute(name, node.data.value)
  }
}

const slotInjectors = [
  injectElement,  // SLOT_ELEMENT
  injectAttribute // SLOT_ATTRIBUTE
]

export default function inject(node, element, insert) {
  const { template, slots } = node.component
  const rootElement = document.importNode(template.content, true).firstElementChild

  for (let i = 0, length = slots.length; i < length; i++) {
    const slot = slots[i]
    const slotNode = node.children[i]
    const element = slot.select(rootElement)

    slotNode.element = slotInjectors[slot.type](slotNode, element, slot) || element
    slotNode.slot = slot
  }

  if (insert) {
    return element.parentNode.appendChild(rootElement)
  }
  element.parentNode.replaceChild(rootElement, element)
  return rootElement
}
