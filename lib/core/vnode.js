export const VNODE_PRIMITIVE = 0
export const VNODE_SEQUENCE = 1
export const VNODE_COMPONENT = 2

const vNodePool = []

export class VNode {
  constructor(type, component, data) {
    this.type = type
    this.data = data
    this.parent = null
    this.children = []
    this.component = component
    this.domNode = null
    // https://jsperf.com/instanceof-performance/2
    this.__isVNode = true
  }
}

function createVNode(type, component, data) {
  if (0 !== vNodePool.length) {
    const node = vNodePool[vNodePool.length - 1]
    vNodePool.pop()
    node.constructor.call(node, type, component, data)
    return node
  }
  return new VNode(type, component, data)
}

export function createPrimitiveVNode(value) {
  return createVNode(VNODE_PRIMITIVE, null, { value })
}

export function createSequenceVNode(children) {
  const component = children.length > 0 ? children[0].component : null
  const node = createVNode(VNODE_SEQUENCE, component, null)
  children.forEach(child => addVNodeChild(node, child))
  return node
}

export function createComponentVNode(component) {
  return createVNode(VNODE_COMPONENT, component, null)
}

export function addVNodeChild(parent, node) {
  node.parent = parent
  parent.children.push(node)
}

export function recycleVNode(node) {
  vNodePool.push(node)
  node.children.forEach(recycleVNode)
}

export function isVNode(obj) {
  return obj.__isVNode
}
