function Patch(operation, newNode, oldNode) {
  this.operation = operation
  this.newNode = newNode
  this.oldNode = oldNode
}

export const PATCH_PRIMITIVE_UPDATE = 0
export const PATCH_PRIMITIVE_MORPH = 1
export const PATCH_SEQUENCE_ADD = 2
export const PATCH_SEQUENCE_UPDATE = 3
export const PATCH_SEQUENCE_REMOVE = 4
export const PATCH_SEQUENCE_CLEAR = 5
export const PATCH_SEQUENCE_MORPH = 6
export const PATCH_COMPONENT_MORPH = 7

export function createPatch(operation, newNode, oldNode) {
  return new Patch(operation, newNode, oldNode)
}
