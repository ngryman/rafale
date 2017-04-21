import diffComponent from './diff-component'
import Patcher from './patcher'

export default function diff(newNode, oldNode) {
  const patcher = new Patcher()
  diffComponent(newNode, oldNode, patcher)
  return patcher.getPatches()
}
