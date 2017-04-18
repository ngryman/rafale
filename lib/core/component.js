function Component(uid, fragment, slots) {
  this.uid = uid
  this.fragment = fragment
  this.slots = slots
}

export function createComponent(uid, fragment, slots) {
  return new Component(uid, fragment, slots)
}