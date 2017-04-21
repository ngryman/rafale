export default function patchSequenceRemove(newNode, oldNode) {
  oldNode.element.remove()
  return 1
}
