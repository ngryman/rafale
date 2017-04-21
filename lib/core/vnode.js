export const VNODE_PRIMITIVE = 0
export const VNODE_SEQUENCE = 1
export const VNODE_COMPONENT = 2

class VNode {
  constructor(type, component, data) {
    this.type = type
    this.data = data
    this.parent = null
    this.children = []
    this.component = component
    this.element = null
    this.slot = null
  }

  addChild(child) {
    child.parent = this
    this.children.push(child)
  }
}

export function createPrimitiveVNode(value) {
  return new VNode(VNODE_PRIMITIVE, null, { value })
}

export function createSequenceVNode(children) {
  const component = children.length > 0 ? children[0].component : null
  const node = new VNode(VNODE_SEQUENCE, component, null)
  children.forEach(child => node.addChild(child))
  return node
}

export function createVNode(component) {
  return new VNode(VNODE_COMPONENT, component, null)
}

export function isVNode(obj) {
  return (Object.getPrototypeOf(obj) === VNode.prototype)
}
