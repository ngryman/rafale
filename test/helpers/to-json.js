export default function toJSON(vnode) {
  return {
    type: vnode.type,
    data: vnode.data,
    children: vnode.children.map(toJSON),
    component: vnode.component && {
      template: vnode.component.template.innerHTML,
      slots: vnode.component.slots
    }
  }
}
