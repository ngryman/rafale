import {
  SLOT_ATTRIBUTE,
  SLOT_ELEMENT
} from './lib/core/slot'
import {
  VNODE_PRIMITIVE,
  VNODE_SEQUENCE,
  VNODE_COMPONENT
} from './lib/core/vnode'

function reconciliate(parentElement, parentNode, slots) {
  for (let i = 0; i < slots.length; i++) {
    const { type, name, path } = slots[i]
    const node = parentNode.children[i]
    let element = parentElement
    
    for (let j = 0; j < path.length; j++) {
      element = element.childNodes[path[j]]
    }
    
    if (SLOT_ELEMENT === type) {
      if (VNODE_PRIMITIVE === node.type) {
        element.nodeValue = node.data.value
      }
      else if (VNODE_COMPONENT === node.type) {
        mount(element, node, false)
      }
      else if (VNODE_SEQUENCE === node.type) {
        for (let k = 0; k < node.children.length; k++) {
          mount(element, node.children[k], element)
        }
        element.remove()
      }
    }
    else if (SLOT_ATTRIBUTE === type) {
      element.setAttribute(name, node.data.value)
    }
  }
}

// TODO: make this monoporphic
function mount(element, node, append) {
  const { fragment, slots } = node.component
  const clone = fragment.cloneNode(true)
  reconciliate(clone, node, slots)
  
  if (true === append) {
    element.appendChild(clone)
  }
  else if (append instanceof Node) {
    element.parentNode.insertBefore(clone, element)
  }
  else {
    element.parentNode.replaceChild(clone, element)
  }
}

export default function(element, node) {
  mount(element, node, true)
}