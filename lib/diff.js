import Patch, {
  PATCH_PRIMITIVE_UPDATE,
  PATCH_SEQUENCE_ADD,
  PATCH_SEQUENCE_REMOVE,
  PATCH_SEQUENCE_CLEAR
} from './core/patch'

const patches = []

const differs = [
  diffPrimitive,
  diffSequence,
  diffComponent
]

function copyRef(newNode, oldNode) {
  newNode.domNode = oldNode.domNode
  newNode.slot = oldNode.slot
}

function pushPatch(type, newNode, oldNode) {
  patches.push(new Patch(type, newNode, oldNode))
}

function pushMorph(newNode, oldNode) {
  // TODO: explain offset
  pushPatch(oldNode.type + 3, newNode, oldNode)
  pushPatch(newNode.type, newNode, oldNode)
}

function diffPrimitive(newNode, oldNode) {
  // TODO: handle events?
  if (newNode.data.value !== oldNode.data.value) {
    pushPatch(PATCH_PRIMITIVE_UPDATE, newNode, oldNode)
  }
}

function diffSequence(newNode, oldNode) {
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
  if (newNode.component.uid !== oldNode.component.uid) {
    pushMorph(newNode, oldNode)
    return
  }

  for (let i = 0, length = newNode.children.length; i < length; i++) {
    const newChild = newNode.children[i]
    const oldChild = oldNode.children[i]

    if (newChild.type === oldChild.type) {
      differs[newChild.type](newChild, oldChild)
    }
    else {
      pushMorph(newChild, oldChild)
    }

    copyRef(newChild, oldChild)
  }

  // TODO: check with patches.length if inner modifications happended,
  // if so fires component's lifecycle event
}

export default function diff(newNode, oldNode) {
  patches.length = 0
  diffComponent(newNode, oldNode)
  copyRef(newNode, oldNode)
  return patches
}
