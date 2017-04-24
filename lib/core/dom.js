export function appendChild(parentNode, node) {
  return parentNode.appendChild(node)
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

export function createText(value) {
  return document.createTextNode(value)
}

export function select(node, path) {
  for (let i = 0; i < path.length; i++) {
    node = node.childNodes[path[i]]
  }
  return node
}

export function empty(node) {
  node.textContent = ''
}

export function remove(node) {
  node.remove()
}

export function replace(newNode, oldNode) {
  oldNode.parentNode.replaceChild(newNode, oldNode)
}

export function setAttribute(node, name, value) {
  if ('function' === typeof value) {
    // TODO: remove attribute in component creation
    node.removeAttribute(name)
    node[name] = value
  }
  else {
    node.setAttribute(name, value)
  }
}

export function setText(node, value) {
  node.data = value
}
