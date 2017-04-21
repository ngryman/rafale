function updateElement(node, element) {
  element.nodeValue = node.data.value
}

function updateAttribute(node, element, slot) {
  const { value } = node.data
  if ('function' === typeof value) {
    element[slot.name] = value
  }
  else {
    element.setAttribute(slot.name, node.data.value)
  }
}

const updaters = [
  updateElement,
  updateAttribute
]

export default function updatePrimitive(node, element, slot) {
  updaters[slot.type](node, element, slot)
}
