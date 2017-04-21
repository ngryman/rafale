import { inject } from './dom'

export default function(node, element) {
  if (!element.firstChild) {
    // TODO: refactor with positional node
    element.appendChild(document.createTextNode(''))
  }
  inject(node, element.firstChild, true)
}
