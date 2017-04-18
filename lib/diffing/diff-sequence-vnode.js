import diffVNode from './diff-vnode'
import {
  PATCH_SEQUENCE_MORPH,
  PATCH_SEQUENCE_ADD,
  PATCH_SEQUENCE_REMOVE,
  PATCH_SEQUENCE_UPDATE,
  createPatch
} from '../core/patch'

export default function diffSequenceVNode(newNode, oldNode, patches) {
  if (newNode.type !== oldNode.type) {
    patches.push(createPatch(PATCH_SEQUENCE_MORPH, newNode, oldNode))
  }

  const newSeq = newNode.children
  const oldSeq = oldNode.children
  const minLength = Math.min(newSeq.length, oldSeq.length)
  const maxLength = Math.max(newSeq.length, oldSeq.length)

  for (var i = 0; i < minLength; i++) {
    diffVNode(newSeq[i], oldSeq[i], patches)
  }

  if (newSeq.length > oldSeq.length) {
    for (; i < maxLength; i++) {
      patches.push(createPatch(PATCH_SEQUENCE_ADD, newSeq[i], oldNode))
    }
  }
  else {
    for (; i < maxLength; i++) {
      patches.push(createPatch(PATCH_SEQUENCE_REMOVE, null, oldSeq[i]))
    }
  }
}
