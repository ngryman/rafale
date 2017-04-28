import { createComponent } from './core/component'
import { isArray } from './core/util'
import {
  createComponentVNode,
  createPrimitiveVNode,
  createSequenceVNode,
  addVNodeChild,
  isVNode
} from './core/vnode'

export default function html(parts) {
  const component = createComponent(parts)
  const node = createComponentVNode(component)

  for (let i = 1, length = arguments.length; i < length; i++) {
    const val = arguments[i]
    let child

    if (isVNode(val)) {
      child = val
    }
    else if (isArray(val)) {
      child = createSequenceVNode(val)
    }
    else {
      child = createPrimitiveVNode(val)
    }

    addVNodeChild(node, child)
  }

  return node
}
