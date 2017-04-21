import Patch from '../core/patch'

export default class Patcher {
  constructor() {
    this.patches = []
  }

  push(type, newNode, oldNode) {
    this.patches.push(new Patch(type, newNode, oldNode))
  }

  getPatches() {
    return this.patches
  }
}
