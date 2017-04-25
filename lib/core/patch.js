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

const pool = []
let poolTop = -1

class Patch {
  constructor(operation, newNode, oldNode) {
    this.operation = operation
    this.newNode = newNode
    this.oldNode = oldNode
  }
}

export function createPatch(operation, newNode, oldNode) {
  let patch
  if (poolTop >= 0) {
    patch = pool[poolTop--]
    patch.constructor.call(patch, operation, newNode, oldNode)
  }
  else {
    patch = new Patch(operation, newNode, oldNode)
  }
  return patch
}

function recyclePatch(patch) {
  pool[++poolTop] = patch
}

export function recyclePatches(patches) {
  patches.forEach(recyclePatch)
}
