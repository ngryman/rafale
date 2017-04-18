function Patch(operation, newNode, oldNode) {
  this.operation = operation
  this.newNode = newNode
  this.oldNode = oldNode
}

// const PATCH_PRIMITIVE = (1 << 8)
// const PATCH_SEQUENCE = (1 << 7)
// const PATCH_COMPONENT = (1 << 6)
//
// export const PATCH_PRIMITIVE_MORPH = (PATCH_PRIMITIVE | 1)
// export const PATCH_PRIMITIVE_UPDATE = (PATCH_PRIMITIVE | 2)
// export const PATCH_SEQUENCE_MORPH = (PATCH_SEQUENCE | 3)
// export const PATCH_SEQUENCE_ADD = (PATCH_SEQUENCE | 4)
// export const PATCH_SEQUENCE_REMOVE = (PATCH_SEQUENCE | 5)
// export const PATCH_SEQUENCE_UPDATE = (PATCH_SEQUENCE | 6)
// export const PATCH_COMPONENT_MORPH = (PATCH_COMPONENT | 7)

export const PATCH_PRIMITIVE_UPDATE = 0
export const PATCH_PRIMITIVE_MORPH = 1
export const PATCH_SEQUENCE_ADD = 2
export const PATCH_SEQUENCE_UPDATE = 3
export const PATCH_SEQUENCE_REMOVE = 4
export const PATCH_SEQUENCE_MORPH = 5
export const PATCH_COMPONENT_MORPH = 6

export function createPatch(operation, newNode, oldNode) {
  return new Patch(operation, newNode, oldNode)
}
