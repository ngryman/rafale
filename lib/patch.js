import { noop } from './core/util'
import { PATCH_SEQUENCE_ADD } from './core/patch'
import {
  appendChild,
  createFragment,
  createTextNode,
  emptyNode,
  removeNode
} from './core/dom'
import {
  injectComponent,
  injectPrimitive,
  injectSequence,
  updatePrimitive
} from './core/reconcile'

const patchers = [
  patchPrimitiveCreate, // PATCH_PRIMITIVE_CREATE
  patchSequenceCreate,  // PATCH_SEQUENCE_CREATE
  patchComponentCreate, // PATCH_COMPONENT_CREATE
  noop,                 // PATCH_PRIMITIVE_DESTROY
  patchSequenceDestroy, // PATCH_SEQUENCE_DESTROY
  noop,                 // PATCH_COMPONENT_DESTROY
  patchPrimitiveUpdate, // PATCH_PRIMITIVE_UPDATE
  patchSequenceAdd,     // PATCH_SEQUENCE_ADD
  patchSequenceRemove,  // PATCH_SEQUENCE_REMOVE
  patchSequenceClear    // PATCH_SEQUENCE_CLEAR
]

function patchPrimitiveCreate(newNode, oldNode) {
  newNode.element = injectPrimitive(newNode, oldNode.element)
}

function patchSequenceCreate(newNode, oldNode) {
  newNode.element = injectSequence(newNode, oldNode.element)
}

function patchComponentCreate(newNode, oldNode) {
  newNode.element = injectComponent(newNode, oldNode.element, false)
}

function patchSequenceDestroy(newNode, oldNode) {
  emptyNode(oldNode.element)

  // Create a positional node for later injection of primitive or component
  oldNode.element = appendChild(oldNode.element, createTextNode(''))
}

function patchPrimitiveUpdate(newNode, oldNode) {
  updatePrimitive(newNode, oldNode.element, oldNode.slot)
  newNode.element = oldNode.element
}

// TODO: do this in the diff -> have all patchers have the same signature

function patchSequenceAdd(newNode, oldNode, patches, context) {
  const element = oldNode.element
  const fragment = createFragment()
  for (var i = context.index, length = patches.length;
    i < length && PATCH_SEQUENCE_ADD === patches[i].operation;
    i++) {
    patches[i].newNode.element = injectComponent(patches[i].newNode, fragment, true)
  }
  element.appendChild(fragment)
  context.index = i - 1
  return element
}

function patchSequenceRemove(newNode, oldNode) {
  // TODO: check this?
  removeNode(oldNode.element)
}

function patchSequenceClear(newNode, oldNode) {
  emptyNode(oldNode.element)
}

export default function patch(patches) {
  const context = { index: 0 }
  const length = patches.length

  while (context.index < length) {
    const patch = patches[context.index]
    const { newNode, oldNode } = patch
    patchers[patch.operation](newNode, oldNode, patches, context)
    context.index++
  }
}
