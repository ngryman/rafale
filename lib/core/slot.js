export const SLOT_ELEMENT = 0
export const SLOT_ATTRIBUTE = 1

export default function Slot(type, name, path) {
  this.type = type
  this.name = name
  this.path = path
}

export function selectSlot(slot, node) {
  const { path } = slot
  for (let i = 0, length = path.length; i < length; i++) {
    node = node.childNodes[path[i]]
  }
  return node
}
