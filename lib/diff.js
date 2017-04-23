import Patch, {
  PATCH_PRIMITIVE_UPDATE,
  PATCH_PRIMITIVE_MORPH,
  PATCH_SEQUENCE_ADD,
  // PATCH_SEQUENCE_UPDATE,
  PATCH_SEQUENCE_REMOVE,
  PATCH_SEQUENCE_CLEAR,
  PATCH_SEQUENCE_MORPH,
  PATCH_COMPONENT_MORPH
} from './core/patch'

const patches = []

const differs = [
  diffPrimitive,
  diffSequence,
  diffComponent
]

function pushPatch(type, newNode, oldNode) {
  patches.push(new Patch(type, newNode, oldNode))
}

function diffPrimitive(newNode, oldNode) {
  // TODO: handle events?

  if (newNode.type !== oldNode.type) {
    pushPatch(PATCH_PRIMITIVE_MORPH, newNode, oldNode)
  }
  else if (newNode.data.value !== oldNode.data.value) {
    pushPatch(PATCH_PRIMITIVE_UPDATE, newNode, oldNode)
  }
}

function diffSequence(newNode, oldNode) {
  if (newNode.type !== oldNode.type) {
    pushPatch(PATCH_SEQUENCE_MORPH, newNode, oldNode)
    return
  }

  const newSeq = newNode.children
  const oldSeq = oldNode.children

  // clear shortcut
  if (0 === newSeq.length && 0 !== oldSeq.length) {
    pushPatch(PATCH_SEQUENCE_CLEAR, newNode, oldNode)
    return
  }

  const minLength = Math.min(newSeq.length, oldSeq.length)
  const maxLength = Math.max(newSeq.length, oldSeq.length)

  for (var i = 0; i < minLength; i++) {
    diffComponent(newSeq[i], oldSeq[i])
  }

  if (newSeq.length > oldSeq.length) {
    for (; i < maxLength; i++) {
      pushPatch(PATCH_SEQUENCE_ADD, newSeq[i], oldNode)
    }
  }
  else {
    for (; i < maxLength; i++) {
      pushPatch(PATCH_SEQUENCE_REMOVE, null, oldSeq[i])
    }
  }
}

function diffComponent(newNode, oldNode) {
  if (newNode.type !== oldNode.type || newNode.component.uid !== oldNode.component.uid) {
    pushPatch(PATCH_COMPONENT_MORPH, newNode, oldNode)
    return
  }

  for (let i = 0, length = newNode.children.length; i < length; i++) {
    const newChild = newNode.children[i]
    const oldChild = oldNode.children[i]
    differs[newChild.type](newChild, oldChild)
  }
}

export default function diff(newNode, oldNode) {
  patches.length = 0
  diffComponent(newNode, oldNode)
  return patches
}
