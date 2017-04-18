import { inject } from './lib/patching'

export default function(node, element) {
  inject(node, element.firstChild, true)
}
