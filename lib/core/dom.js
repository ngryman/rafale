export function appendChild(parentNode, node) {
  parentNode.appendChild(node)
}

export function cloneTemplate(template) {
  return document.importNode(template.content, true).firstElementChild
}

export function createElement(tagName) {
  return document.createElement(tagName)
}

export function createFragment() {
  return document.createDocumentFragment()
}

export function createTextNode(value) {
  return document.createTextNode(value)
}

export function findNode(node, path) {
  for (let i = 0; i < path.length; i++) {
    node = node.childNodes[path[i]]
  }
  return node
}

export function emptyNode(node) {
  // // http://jsperf.com/emptying-a-node
  // while (node.lastChild) {
  //   node.removeChild(node.lastChild)
  // }
  node.textContent = ''
}

export function removeNode(node) {
  node.remove()
}

export function replaceNode(newNode, oldNode) {
  oldNode.parentNode.replaceChild(newNode, oldNode)
}

export function setNodeAttribute(node, name, value) {
  // TODO: check how to remove
  if ('function' === typeof value) {
    node.removeAttribute(name)
    node[name] = value
  }
  else {
    node.setAttribute(name, value)
  }
}

export function setNodeText(node, value) {
  node.nodeValue = value
}
