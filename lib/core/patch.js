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

const PATCH_PRIMITIVE = 'primitive'
const PATCH_SEQUENCE = 'sequence'
const PATCH_COMPONENT = 'component'

export const PATCH_PRIMITIVE_MORPH = 'morph(primitive)'
export const PATCH_PRIMITIVE_UPDATE = 'update(primitive)'
export const PATCH_SEQUENCE_MORPH = 'morph(sequence)'
export const PATCH_SEQUENCE_ADD = 'add(sequence)'
export const PATCH_SEQUENCE_REMOVE = 'remove(sequence)'
export const PATCH_SEQUENCE_UPDATE = 'update(sequence)'
export const PATCH_COMPONENT_MORPH = 'morph(component)'

export function createPatch(operation, newNode, oldNode) {
  return new Patch(operation, newNode, oldNode)
}