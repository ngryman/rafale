import {
  PATCH_PRIMITIVE_MORPH,
  PATCH_PRIMITIVE_UPDATE
} from '../core/patch'

export default function diffPrimitive(newNode, oldNode, patcher) {
  // TODO: handle events?
  if (newNode.data.value !== oldNode.data.value) {
    patcher.push(PATCH_PRIMITIVE_UPDATE, newNode, oldNode)
  }
  else if (newNode.type !== oldNode.type) {
    patcher.push(PATCH_PRIMITIVE_MORPH, newNode, oldNode)
  }
}
