import { createFragment, emptyNode, removeNode } from './core/dom'
import { injectComponent, injectPrimitive, updatePrimitive } from './core/reconcile'
import { notImplemented } from './core/util'
import { PATCH_SEQUENCE_ADD } from './core/patch'

const patchers = [
  patchPrimitiveUpdate, // PATCH_PRIMITIVE_MORPH
  patchPrimitiveMorph,  // PATCH_PRIMITIVE_MORPH
  patchSequenceAdd,     // PATCH_SEQUENCE_ADD
  notImplemented,       // PATCH_SEQUENCE_UPDATE
  patchSequenceRemove,  // PATCH_SEQUENCE_REMOVE
  patchSequenceClear,   // PATCH_SEQUENCE_CLEAR
  notImplemented,       // PATCH_SEQUENCE_MORPH
  patchComponentMorph   // PATCH_COMPONENT_MORPH
]

function patchPrimitiveUpdate(newNode, oldNode) {
  newNode.element = updatePrimitive(newNode, oldNode.element, oldNode.slot)
}

function patchPrimitiveMorph(newNode, oldNode) {
  newNode.element = injectPrimitive(newNode, oldNode.element)
}

// TODO: do this in the diff
function patchSequenceAdd(newNode, oldNode, patches, index) {
  const element = oldNode.element
  const fragment = createFragment()
  for (var i = index, length = patches.length;
    i < length && PATCH_SEQUENCE_ADD === patches[i].operation;
    i++) {
    patches[i].newNode.element = injectComponent(patches[i].newNode, fragment, true)
  }
  element.appendChild(fragment)
  return (i - index)
}

function patchSequenceRemove(newNode, oldNode) {
  removeNode(oldNode.element)
}

function patchSequenceClear(newNode, oldNode) {
  emptyNode(oldNode.element)
  newNode.element = oldNode.element
}

function patchComponentMorph(newNode, oldNode) {
  injectComponent(newNode, oldNode.element, false)
}

export default function patch(patches) {
  requestAnimationFrame(() => {
    for (let i = 0, patched = 1, length = patches.length; i < length; i += patched) {
      const patch = patches[i]
      const { newNode, oldNode } = patch
      patched = patchers[patch.operation](newNode, oldNode, patches, i) || 1
    }
  })
}
