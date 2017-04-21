import { PATCH_COMPONENT_MORPH } from '../core/patch'
import diffPrimitive from './diff-primitive'
import diffSequence from './diff-sequence'

const differs = [
  diffPrimitive,
  diffSequence
]

export default function diffComponent(newNode, oldNode, patcher) {
  if (newNode.type !== oldNode.type || newNode.component.uid !== oldNode.component.uid) {
    patcher.push(PATCH_COMPONENT_MORPH, newNode, oldNode)
    return
  }

  for (let i = 0, length = newNode.children.length; i < length; i++) {
    const newChild = newNode.children[i]
    const oldChild = oldNode.children[i]

    differs[newChild.type](newChild, oldChild, patcher)
  }
}
