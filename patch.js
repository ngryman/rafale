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

function patchSequenceAdd(patch) {
  const node = patch.newNode
  const { fragment, slots } = node.component
  const newElement = fragment.cloneNode(true)
  reconciliate(newElement, node, slots)
  
  const parentElement = node.parent.instance.element
  parentElement.appendChild(newElement)
}

export default function patch(patches) {
  for (let i = 0, length = patches.length; i < length; i++) {
    const patch = patches[i]
    
    if (PATCH_SEQUENCE_ADD === patch.operation) {
      patchSequenceAdd(patch)
    }
  }
}