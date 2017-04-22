import test from 'ava'
import html from '../lib/html'

function toJSON(vnode) {
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

test('create a simple component', t => {
  const vtree = html`<p>foo</p>`
  t.snapshot(toJSON(vtree))
})

test('create a component with a primitive child', t => {
  const primitive = 'foo'
  const vtree = html`<p>${primitive}</p>`
  t.snapshot(toJSON(vtree))
})

test('create a component with a nested component child', t => {
  const parapgraph = () => html`<p>foo</p>`
  const vtree = html`<section>${parapgraph()}</section>`
  t.snapshot(toJSON(vtree))
})

test('create a component with a sequence child', t => {
  const sequence = ['foo', 'bar']
  const parapgraph = (content, id) => html`<p id=${id}>${content}</p>`
  const vtree = html`<section>${sequence.map(parapgraph)}</ul>`
  t.snapshot(toJSON(vtree))
})
