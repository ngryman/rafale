export default function patchSequenceClear(newNode, oldNode) {
  const { element } = oldNode
  element.innerHTML = ''
  newNode.element = element
  return 1
}
