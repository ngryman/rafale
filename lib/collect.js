import { collectVTree, isVNode } from './core/vnode'
import { collectPatches } from './core/patch'
import { isArray } from './core/util'

export default function collect(obj) {
  if (isVNode(obj)) {
    collectVTree(obj)
  }
  else if (isArray(obj)) {
    collectPatches(obj)
  }
}
