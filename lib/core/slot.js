export const SLOT_ELEMENT = 0
export const SLOT_ATTRIBUTE = 1

export default class Slot {
  constructor(type, name, path) {
    this.type = type
    this.name = name
    this.path = path
  }

  select(rootElement) {
    let element = rootElement
    for (let i = 0; i < this.path.length; i++) {
      element = element.childNodes[this.path[i]]
    }
    return element
  }
}
