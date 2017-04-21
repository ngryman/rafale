import { registerComponent } from './register'
import {
  createPrimitiveVNode,
  createSequenceVNode,
  createVNode,
  isVNode
} from '../core/vnode'

export default function render(parts, values) {
  const component = registerComponent(parts)
  const node = createVNode(component)

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
