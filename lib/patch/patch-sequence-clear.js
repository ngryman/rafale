export default function patchSequenceClear(newNode, oldNode) {
  oldNode.element.textContent = ''
  newNode.element = oldNode.element
  return 1
}
