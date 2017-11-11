import Recycler from './recycler'

export const VNODE_PRIMITIVE = 0
export const VNODE_SEQUENCE = 1
export const VNODE_COMPONENT = 2

const recycler = new Recycler(VNode)

function VNode(type, component, value) {
  this.type = type
  this.component = component
  this.domNode = null
  this.value = value

  if (this.children) {
    this.children.length = 0
  }
  else {
    this.children = []
  }

  // https://jsperf.com/instanceof-performance/2
  this.__isVNode = true
}

export function addVNodeChild(parent, node) {
  parent.children.push(node)
}

export function createPrimitiveVNode(value) {
  return recycler.recycle(VNODE_PRIMITIVE, null, value)
}

export function createSequenceVNode(children) {
  const component = children.length > 0 ? children[0].component : null
  const node = recycler.recycle(VNODE_SEQUENCE, component, null)
  for (let i = 0, length = children.length; i < length; i++) {
    addVNodeChild(node, children[i])
  }
  return node
}

export function createComponentVNode(component) {
  return recycler.recycle(VNODE_COMPONENT, component, null)
}

export function collectVTree(node) {
  recycler.collect(node)
  node.children.forEach(collectVTree)
}

export function isVNode(obj) {
  return obj.__isVNode
}
