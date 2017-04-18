import {
  SLOT_ATTRIBUTE,
  SLOT_ELEMENT
} from '../core/slot'
import {
  VNODE_PRIMITIVE,
  VNODE_SEQUENCE,
  VNODE_COMPONENT
} from '../core/vnode'

export default function inject(componentNode, hostElement, insert) {
  const { fragment, slots } = componentNode.component
  const nodeElement = fragment.cloneNode(true)

  for (let i = 0; i < slots.length; i++) {
    const { type, name, path } = slots[i]
    const node = componentNode.children[i]
    let element = nodeElement

    for (let j = 0; j < path.length; j++) {
      element = element.childNodes[path[j]]
    }

    if (SLOT_ELEMENT === type) {
      if (VNODE_PRIMITIVE === node.type) {
        element.nodeValue = node.data.value
        node.element = element
      }
      else if (VNODE_COMPONENT === node.type) {
        node.element = inject(node, element, false)
      }
      else if (VNODE_SEQUENCE === node.type) {
        for (let k = 0; k < node.children.length; k++) {
          const child = node.children[k]
          child.element = inject(child, element, true)
        }

        // Add a positional node for later patches operation. Its purpose is to be able to use
        // `Node#insertBefore` when appending new items to the sequence
        const positionalNode = document.createTextNode('')
        element.parentNode.appendChild(positionalNode)

        node.element = element.parentNode
        element.remove()
      }
    }
    else if (SLOT_ATTRIBUTE === type) {
      element.setAttribute(name, node.data.value)
      node.element = element
    }

    node.slot = slots[i]
  }

  if (insert) {
    return hostElement.parentNode.insertBefore(nodeElement, hostElement)
  }
  hostElement.parentNode.replaceChild(nodeElement, hostElement)
  return nodeElement
}
