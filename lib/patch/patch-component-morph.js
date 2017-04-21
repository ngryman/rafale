import injectComponent from '../dom/inject-component'

export default function patchComponentMorph(newNode, oldNode) {
  injectComponent(newNode, oldNode.element, false)
  return 1
}
