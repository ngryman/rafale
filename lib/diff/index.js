import diffComponent from './diff-component'
import { createPatcher } from './patcher'

export default function diff(newNode, oldNode) {
  const patcher = createPatcher()
  diffComponent(newNode, oldNode, patcher)
  return patcher.getPatches()
}
