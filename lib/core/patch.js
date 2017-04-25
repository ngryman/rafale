import Recycler from './recycler'

export const PATCH_PRIMITIVE_CREATE = 0
export const PATCH_SEQUENCE_CREATE = 1
export const PATCH_COMPONENT_CREATE = 2

export const PATCH_PRIMITIVE_DESTROY = 3
export const PATCH_SEQUENCE_DESTROY = 4
export const PATCH_COMPONENT_DESTROY = 5

export const PATCH_PRIMITIVE_UPDATE = 6
export const PATCH_SEQUENCE_ADD = 7
export const PATCH_SEQUENCE_REMOVE = 8
export const PATCH_SEQUENCE_CLEAR = 9

const recycler = new Recycler(Patch)

function Patch(operation, newNode, oldNode) {
  this.operation = operation
  this.newNode = newNode
  this.oldNode = oldNode
}

export function createPatch(operation, newNode, oldNode) {
  return recycler.recycle(operation, newNode, oldNode)
}

export function recyclePatches(patches) {
  patches.forEach(patch => recycler.collect(patch))
}
