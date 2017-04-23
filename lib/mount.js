import { appendChild, createTextNode } from './core/dom'
import { injectComponent } from './core/reconcile'

export default function(node, element = document.body) {
  if (!element.firstChild) {
    appendChild(element, createTextNode(''))
  }
  injectComponent(node, element, true)
}
