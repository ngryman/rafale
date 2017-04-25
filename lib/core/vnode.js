import Recycler from './recycler'

export const VNODE_PRIMITIVE = 0
export const VNODE_SEQUENCE = 1
export const VNODE_COMPONENT = 2

const recycler = new Recycler(VNode)

function VNode(type, component, value) {
  this.type = type
  this.parent = null
  this.children = []
  this.component = component
  this.domNode = null
  this.value = value
  // https://jsperf.com/instanceof-performance/2
  this.__isVNode = true
}

export function addVNodeChild(parent, node) {
  node.parent = parent
  parent.children.push(node)
}

export function createPrimitiveVNode(value) {
  return recycler.createInstance(VNODE_PRIMITIVE, null, value)
}

export function createSequenceVNode(children) {
  const component = children.length > 0 ? children[0].component : null
  const node = recycler.createInstance(VNODE_SEQUENCE, component, null)
  children.forEach(child => addVNodeChild(node, child))
  return node
}

export function createComponentVNode(component) {
  return recycler.createInstance(VNODE_COMPONENT, component, null)
}

export function recycleVTree(node) {
  recycler.recycle(node)
  node.children.forEach(recycleVTree)
}

export function isVNode(obj) {
  return obj.__isVNode
}
