import diffPrimitiveVNode from './diff-primitive-vnode'
import diffSequenceVNode from './diff-sequence-vnode'
import {
  PATCH_COMPONENT_MORPH,
  createPatch
} from '../core/patch'
import {
  VNODE_PRIMITIVE,
  VNODE_SEQUENCE
} from '../core/vnode'

export default function diffVNode(newNode, oldNode, patches) {
  if (newNode.type !== oldNode.type || newNode.component.uid !== oldNode.component.uid) {
    patches.push(createPatch(PATCH_COMPONENT_MORPH, newNode, oldNode))
    return
  }

  for (let i = 0, length = newNode.children.length; i < length; i++) {
    const newChild = newNode.children[i]
    const oldChild = oldNode.children[i]

    if (VNODE_PRIMITIVE === newChild.type) {
      diffPrimitiveVNode(newChild, oldChild, patches)
    }
    else if (VNODE_SEQUENCE === newChild.type) {
      diffSequenceVNode(newChild, oldChild, patches)
    }
    else {
      diffVNode(newChild, oldChild, patches)
    }
  }
}
