import {
  createElementSlot,
  createAttributeSlot
} from '../core/slot'

export default function collectSlots(root, placeholder) {
  const slots = []
  const stack = [root]
  const path = [-1]
  const dummy = document.createElement('_')
  
  while (0 !== stack.length) {
    const node = stack.pop()
    
    if (node.isSameNode(dummy)) {
      path.pop()
      continue
    }
    
    path[path.length - 1]++
    
    if (3 === node.nodeType) {
      if (node.nodeValue.trim() === placeholder) {
        slots.push(createElementSlot(path.slice(1)))
      }
    }
    else if (1 === node.nodeType) {
      for (let i = 0; i < node.attributes.length; i++) {
        const attribute = node.attributes[i]
        if (attribute.value === placeholder) {
          slots.push(createAttributeSlot(attribute.name, path.slice(1)))
        }
      }
      
      stack.push(dummy)
      for (let i = node.childNodes.length - 1; i >= 0; i--) {
        stack.push(node.childNodes[i])
      }
      path.push(-1)
    }
  }
  
  return slots
}