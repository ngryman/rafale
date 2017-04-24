export const vnodeToJSON = (vnode) => ({
  type: vnode.type,
  data: vnode.data,
  children: vnode.children.map(vnodeToJSON),
  component: vnode.component && {
    template: vnode.component.template.innerHTML,
    slots: vnode.component.slots
  }
})

const patchToJSON = (patch) => ({
  operation: patch.operation,
  newNode: patch.newNode && vnodeToJSON(patch.newNode),
  oldNode: patch.oldNode && vnodeToJSON(patch.oldNode)
})

export const patchesToJSON = (patches) => patches.map(patchToJSON)

const attributeToJSON = (attribute) => ({
  name: attribute.name,
  value: attribute.value
})

export const nodeToJSON = (node) => ({
  nodeName: node.nodeName,
  textContent: node.textContent,
  attributes: node.attributes && [].map.call(node.attributes, attributeToJSON),
  onclick: node.onclick,
  children: node.children && [].map.call(node.children, nodeToJSON)
})
