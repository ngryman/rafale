import clearChildren from '../dom/clear-children'

export default function patchSequenceClear(newNode, oldNode) {
  newNode.element = clearChildren(oldNode.element)
  return 1
}
