import test from 'ava'
import { html, recycle } from '../'

test('recycle a vnode', t => {
  const oldVNode = html`<b>foo</b>`
  recycle(oldVNode)
  const newVNode = html`<b>foo</b>`
  t.is(newVNode, oldVNode)
})
