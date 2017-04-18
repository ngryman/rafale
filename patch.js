import { inject } from './lib/patching'
import {
  SLOT_ATTRIBUTE,
  SLOT_ELEMENT
} from './lib/core/slot'
import {
  PATCH_PRIMITIVE_MORPH,
  PATCH_PRIMITIVE_UPDATE,
  PATCH_SEQUENCE_MORPH,
  PATCH_SEQUENCE_ADD,
  PATCH_SEQUENCE_REMOVE,
  PATCH_SEQUENCE_UPDATE,
  PATCH_COMPONENT_MORPH
} from './lib/core/patch'

// TODO: do patching in diffing -> morphing?

function patchPrimitiveUpdate(newNode, oldNode) {
  if (SLOT_ATTRIBUTE === oldNode.slot) {
    oldNode.element.setAttribute(oldNode.slot.name, newNode.data.value)
  }
  else {
    oldNode.element.nodeValue = newNode.data.value
  }
  newNode.element = oldNode.element
}

function patchSequenceAdd(newNode, oldNode) {
  const element = oldNode.children[0].element
  inject(newNode, element, true)
}

export default function patch(patches) {
  for (let i = 0, length = patches.length; i < length; i++) {
    const patch = patches[i]
    const { newNode, oldNode } = patch

    if (PATCH_PRIMITIVE_UPDATE === patch.operation) {
      patchPrimitiveUpdate(newNode, oldNode)
    }
    else if (PATCH_SEQUENCE_ADD === patch.operation) {
      patchSequenceAdd(newNode, oldNode)
    }
  }
}
