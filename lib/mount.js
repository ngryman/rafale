import { appendChild, createText } from './core/dom'
import { injectComponent } from './core/reconcile'

export default function(node, domNode) {
  if (!domNode) {
    domNode = document.body
  }
  if (!domNode.firstChild) {
    appendChild(domNode, createText(''))
  }
  node.domNode = injectComponent(node, domNode, true)
}
