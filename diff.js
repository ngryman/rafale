import { diffVNode } from './lib/diffing'

export default function diff(newNode, oldNode) {
  if (null == oldNode) return null

  const patches = []
  diffVNode(newNode, oldNode, patches)
  return patches
}
