import updatePrimitive from '../dom/update-primitive'

export default function patchPrimitiveUpdate(newNode, oldNode) {
  updatePrimitive(newNode, oldNode.element, oldNode.slot)
  newNode.element = oldNode.element
  return 1
}
