import {
  PATCH_PRIMITIVE_MORPH,
  PATCH_PRIMITIVE_UPDATE,
  createPatch
} from '../core/patch'

export default function diffPrimitiveVNode(newNode, oldNode, patches) {
  // TODO: handle events?
  if (newNode.type !== oldNode.type) {
    patches.push(createPatch(PATCH_PRIMITIVE_MORPH, newNode, oldNode))
  }
  else if (newNode.data.value !== oldNode.data.value) {
    patches.push(createPatch(PATCH_PRIMITIVE_UPDATE, newNode, oldNode))
  }
}
