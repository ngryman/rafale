import test from 'ava'
import { html, diff, collect } from '../index'

test('recycle a vnode', t => {
  const oldVNode = html`<b>foo</b>`
  collect(oldVNode)
  const newVNode = html`<b>foo</b>`
  t.true(newVNode === oldVNode)
})

test('recycle patches', t => {
  const oldBatch = diff(html`<b>foo</b>`, html`<i>foo</i>`)
  const oldPatch = oldBatch[0]
  collect(oldBatch)
  const newBatch = diff(html`<i>foo</i>`, html`<b>foo</b>`)
  const newPatch = newBatch[1]
  t.true(newPatch === oldPatch)
})
