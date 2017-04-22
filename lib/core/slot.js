export const SLOT_ELEMENT = 0
export const SLOT_ATTRIBUTE = 1

export default class Slot {
  constructor(type, name, path) {
    this.type = type
    this.name = name
    this.path = path
  }
}
