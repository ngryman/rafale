import injectComponent from '../dom/inject-component'
import { PATCH_SEQUENCE_ADD } from '../core/patch'

export default function patchSequenceAdd(newNode, oldNode, patches, index) {
  const element = oldNode.element
  // const lastChild = element.lastChild

  const fragment = document.createDocumentFragment()
  const lastChild = document.createTextNode('')
  fragment.appendChild(lastChild)

  for (var i = index, length = patches.length;
    i < length && PATCH_SEQUENCE_ADD === patches[i].operation;
    i++) {
    injectComponent(patches[i].newNode, lastChild, true)
  }

  element.appendChild(fragment)

  return (i - index)
}
