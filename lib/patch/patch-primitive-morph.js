import injectPrimitive from '../dom/inject-primitive'

export default function patchPrimitiveMorph(newNode, oldNode) {
  newNode.element = injectPrimitive(newNode, oldNode.element)
  return 1
}
