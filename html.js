import hash from 'string-hash'

import { registerComponent } from './lib/core/registry'
import {
  createPrimitiveVNode,
  createSequenceVNode,
  createVNode,
  isVNode
} from './lib/core/vnode'

export default function(parts, ...values) {
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
