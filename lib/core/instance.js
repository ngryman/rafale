function Instance(component) {
  this.component = component
  this.element = null
}

export function createInstance(component) {
  return new Instance(component)
}