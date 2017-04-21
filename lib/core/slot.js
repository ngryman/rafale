export const SLOT_ELEMENT = 0
export const SLOT_ATTRIBUTE = 1

function Slot(type, name, path) {
  this.type = type
  this.name = name
  this.path = path
}

Slot.prototype = {
  select(rootElement) {
    let element = rootElement
    for (let i = 0; i < this.path.length; i++) {
      element = element.childNodes[this.path[i]]
    }
    return element
  }
}

export function createElementSlot(path) {
  return new Slot(SLOT_ELEMENT, null, path)
}

export function createAttributeSlot(name, path) {
  return new Slot(SLOT_ATTRIBUTE, name, path)
}
