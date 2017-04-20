import { inject } from './lib/patching'
import { SLOT_ATTRIBUTE } from './lib/core/slot'
import { notImplemented } from './lib/core/util'
import {
  PATCH_PRIMITIVE_UPDATE,
  PATCH_PRIMITIVE_MORPH,
  PATCH_SEQUENCE_ADD,
  PATCH_SEQUENCE_UPDATE,
  PATCH_SEQUENCE_REMOVE,
  PATCH_SEQUENCE_MORPH,
  PATCH_COMPONENT_MORPH
} from './lib/core/patch'

// TODO: do patching in diffing -> morphing?

function patchPrimitiveMorph(newNode, oldNode) {
  const element = document.createTextNode(newNode.data.value)
  newNode.element = oldNode.element.parentNode.replaceChild(element, oldNode.element)
  return 1
}

function patchPrimitiveUpdate(newNode, oldNode) {
  if (SLOT_ATTRIBUTE === oldNode.slot) {
    oldNode.element.setAttribute(oldNode.slot.name, newNode.data.value)
  }
  else {
    oldNode.element.nodeValue = newNode.data.value
  }
  newNode.element = oldNode.element
  return 1
}

function patchSequenceAdd(newNode, oldNode, patches, index) {
  const element = oldNode.element
  // const lastChild = element.lastChild

  const fragment = document.createDocumentFragment()
  const lastChild = document.createTextNode('')
  fragment.appendChild(lastChild)

  for (var i = index, length = patches.length; i < length && PATCH_SEQUENCE_ADD === patches[i].operation; i++) {
    inject(patches[i].newNode, lastChild, true)
  }

  element.appendChild(fragment)

  return (i - index)
}

function patchSequenceRemove(oldNode) {
  oldNode.element.remove()
  return 1
}

function patchComponentMorph(newNode, oldNode) {
  inject(newNode, oldNode.element, false)
  return 1
}

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
