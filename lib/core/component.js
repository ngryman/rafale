function Component(uid, template, slots) {
  this.uid = uid
  this.template = template
  this.slots = slots
}

export function createComponent(uid, template, slots) {
  return new Component(uid, template, slots)
}
