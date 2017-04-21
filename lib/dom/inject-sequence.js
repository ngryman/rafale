import injectComponent from './inject-component'

export default function injectSequence(node, element) {
  for (let i = 0, length = node.children.length; i < length; i++) {
    const child = node.children[i]
    child.element = injectComponent(child, element, true)
  }
  const nodeElement = (element.parentNode || node.parent.element)
  element.remove()
  return nodeElement
}
