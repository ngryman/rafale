import Pool from './pool'

export const VNODE_PRIMITIVE = 0
export const VNODE_SEQUENCE = 1
export const VNODE_COMPONENT = 2

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

const pool = new Pool(VNode)

function createVNode(type, component, value) {
  return pool.getInstance(type, component, value)
}

export function createPrimitiveVNode(value) {
  return createVNode(VNODE_PRIMITIVE, null, value)
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

export function recycleVTree(node) {
  pool.recycle(node)
  node.children.forEach(recycleVTree)
}

export function isVNode(obj) {
  return obj.__isVNode
}
