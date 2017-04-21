import patchComponentMorph from './patch-component-morph'
import patchPrimitiveMorph from './patch-primitive-morph'
import patchPrimitiveUpdate from './patch-primitive-update'
import patchSequenceAdd from './patch-sequence-add'
import patchSequenceRemove from './patch-sequence-remove'
import { notImplemented } from '../core/util'

// TODO: do patching in diffing -> morphing?

const patchers = [
  patchPrimitiveUpdate, // PATCH_PRIMITIVE_MORPH
  patchPrimitiveMorph,  // PATCH_PRIMITIVE_MORPH
  patchSequenceAdd,     // PATCH_SEQUENCE_ADD
  notImplemented,       // PATCH_SEQUENCE_UPDATE
  patchSequenceRemove,  // PATCH_SEQUENCE_REMOVE
  notImplemented,       // PATCH_SEQUENCE_MORPH
  patchComponentMorph   // PATCH_COMPONENT_MORPH
]

export default function patch(patches) {
  requestAnimationFrame(() => {
    for (let i = 0, patched = 1, length = patches.length; i < length; i += patched) {
      const patch = patches[i]
      const { newNode, oldNode } = patch
      patched = patchers[patch.operation](newNode, oldNode, patches, i)
    }
  })
}
