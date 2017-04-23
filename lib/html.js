import { createComponent } from './core/component'
import {
  createComponentVNode, createPrimitiveVNode, createSequenceVNode, isVNode
} from './core/vnode'

export default function html(parts, ...values) {
  const component = createComponent(parts)
  const node = createComponentVNode(component)

  for (let i = 0; i < values.length; i++) {
    const val = values[i]
    let child

    if (isVNode(val)) {
      child = val
    }
    else if (Array.isArray(val)) {
      child = createSequenceVNode(val)
    }
    else {
      child = createPrimitiveVNode(val)
    }

    node.addChild(child)
  }

  return node
}
