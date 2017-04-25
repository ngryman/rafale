import { recycleVTree, isVNode } from './core/vnode'
import { recyclePatches } from './core/patch'
import { isArray } from './core/util'

export default function recycle(obj) {
  if (isVNode(obj)) {
    recycleVTree(obj)
  }
  else if (isArray(obj)) {
    recyclePatches(obj)
  }
}
