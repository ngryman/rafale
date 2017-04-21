import { createPatch } from '../core/patch'

function Patcher() {
  this.patches = []
}

Patcher.prototype = {
  push(type, newNode, oldNode) {
    this.patches.push(createPatch(type, newNode, oldNode))
  },

  getPatches() {
    return this.patches
  }
}

export function createPatcher() {
  return new Patcher()
}
