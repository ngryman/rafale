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
  const render = () => html`<p>foo</p>`
  t.snapshot(toJSON(render()))
})

test('create a component with a primitive child', t => {
  const render = (text) => html`<p>${text}</p>`
  t.snapshot(toJSON(render('foo')))
})

test('create a component with a nested component child', t => {
  const renderText = () => html`<p>foo</p>`
  const render = () => html`<section>${renderText()}</section>`
  t.snapshot(toJSON(render()))
})

test('create a component with a sequence child', t => {
  const renderText = (text) => html`<p>${text}</p>`
  const render = (content) => html`<section>${content.map(renderText)}</ul>`
  t.snapshot(toJSON(render(['foo', 'bar'])))
})

test('create a component with an attribute', t => {
  const render = (id) => html`<section id="${id}"></section>`
  t.snapshot(toJSON(render('foo')))
})

test('create a component with an attribute without quotes', t => {
  const render = (id) => html`<section id=${id}></section>`
  t.snapshot(toJSON(render('foo')))
})

test('create a component with a function attribute', t => {
  const render = (handler) => html`<button onclick=${handler}></section>`
  t.snapshot(toJSON(render(function handler() {})))
})

test('accept rootless functions', t => {
  const renderText = (text) => html`<p>${text}</p>`
  const renderContent = (content) => content.map(renderText)
  const render = (content) => html`<section>${renderContent(content)}</section>`
  t.snapshot(toJSON(render(['foo', 'bar'])))
})
