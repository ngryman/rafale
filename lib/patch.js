import { noop } from './core/util'
import { PATCH_SEQUENCE_ADD } from './core/patch'
import {
  appendChild,
  createFragment,
  createText,
  empty,
  remove
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
  newNode.domNode = injectPrimitive(newNode, oldNode.domNode)
}

function patchSequenceCreate(newNode, oldNode) {
  newNode.domNode = injectSequence(newNode, oldNode.domNode)
}

function patchComponentCreate(newNode, oldNode) {
  newNode.domNode = injectComponent(newNode, oldNode.domNode, false)
}

function patchSequenceDestroy(newNode, oldNode) {
  empty(oldNode.domNode)

  // Create a positional node for later injection of primitive or component
  oldNode.domNode = appendChild(oldNode.domNode, createText(''))
}

function patchPrimitiveUpdate(newNode, oldNode) {
  updatePrimitive(newNode, oldNode.domNode, oldNode.slot)
  newNode.domNode = oldNode.domNode
}

// TODO: do this in the diff -> have all patchers have the same signature

function patchSequenceAdd(newNode, oldNode, patches, context) {
  const domNode = oldNode.domNode
  const fragment = createFragment()
  for (var i = context.index, length = patches.length;
    i < length && PATCH_SEQUENCE_ADD === patches[i].operation;
    i++) {
    patches[i].newNode.domNode = injectComponent(patches[i].newNode, fragment, true)
  }
  domNode.appendChild(fragment)
  context.index = i - 1
  return domNode
}

function patchSequenceRemove(newNode, oldNode) {
  // TODO: check this?
  remove(oldNode.domNode)
}

function patchSequenceClear(newNode, oldNode) {
  empty(oldNode.domNode)
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
