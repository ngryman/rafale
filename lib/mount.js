import { injectComponent } from './core/reconcile'

export default function(node, element) {
  if (!element.firstChild) {
    // TODO: refactor with positional node
    element.appendChild(document.createTextNode(''))
  }
  injectComponent(node, element, true)
}
