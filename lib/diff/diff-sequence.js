import diffComponent from './diff-component'
import {
  PATCH_SEQUENCE_MORPH,
  PATCH_SEQUENCE_ADD,
  PATCH_SEQUENCE_REMOVE,
  PATCH_SEQUENCE_UPDATE
} from '../core/patch'

export default function diffSequence(newNode, oldNode, patcher) {
  if (newNode.type !== oldNode.type) {
    patcher.push(PATCH_SEQUENCE_MORPH, newNode, oldNode)
    return
  }

  const newSeq = newNode.children
  const oldSeq = oldNode.children
  const minLength = Math.min(newSeq.length, oldSeq.length)
  const maxLength = Math.max(newSeq.length, oldSeq.length)

  for (var i = 0; i < minLength; i++) {
    diffComponent(newSeq[i], oldSeq[i], patcher)
  }

  if (newSeq.length > oldSeq.length) {
    for (; i < maxLength; i++) {
      patcher.push(PATCH_SEQUENCE_ADD, newSeq[i], oldNode)
    }
  }
  else {
    for (; i < maxLength; i++) {
      patcher.push(PATCH_SEQUENCE_REMOVE, null, oldSeq[i])
    }
  }
}
