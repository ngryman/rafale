// const SLOT_ATTRIBUTE = 1
// const SLOT_ELEMENT = 2

export const SLOT_ATTRIBUTE = 'attribute'
export const SLOT_ELEMENT = 'element'

function Slot(type, name, path) {
  this.type = type
  this.name = name
  this.path = path
}

export function createElementSlot(path) {
  return new Slot(SLOT_ELEMENT, null, path)
}

export function createAttributeSlot(name, path) {
  return new Slot(SLOT_ATTRIBUTE, name, path)
}