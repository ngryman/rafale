export default function injectPrimitive(node, element) {
  const newElement = document.createTextNode(node.data.value)
  return element.parentNode.replaceChild(newElement, element)
}
