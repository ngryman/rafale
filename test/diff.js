import test from 'ava'
import { patchesToJSON } from './helpers/to-json'
import { html, diff } from '../'

function macro(t, newVTree, oldVTree) {
  t.snapshot(patchesToJSON(diff(newVTree, oldVTree)))
}

const renderPrimitive = (text) => text
const renderBold = (text) => html`<b>${text}</b>`
const renderItalic = (text) => html`<i>${text}</i>`
const render = (content) => html`<p>${content}</p>`

test('morph a root component', macro,
  renderItalic('foo'),
  renderBold('foo')
)

test('morph a component', macro,
  render(renderItalic('foo')),
  render(renderBold('foo')),
)

test('morph a component into a primitive', macro,
  render(renderPrimitive('foo')),
  render(renderBold('foo'))
)

test('morph a component into a sequence', macro,
  render(['foo', 'bar'].map(renderBold)),
  render(renderBold('foo'))
)

test('morph a sequence', macro,
  render(['foo', 'bar'].map(renderItalic)),
  render(['foo', 'bar'].map(renderBold))
)

test('morph a sequence into a component', macro,
  render(renderBold('foo')),
  render(['foo', 'bar'].map(renderBold))
)

test('morph a sequence into a primitive', macro,
  render(renderPrimitive('foo')),
  render(['foo', 'bar'].map(renderBold))
)

test('add items to a sequence', macro,
  render(['foo', 'bar', 'baz', 'qux'].map(renderBold)),
  render(['foo', 'bar'].map(renderBold))
)

test('remove items from a sequence', macro,
  render(['foo', 'baz'].map(renderBold)),
  render(['foo', 'bar', 'baz', 'qux'].map(renderBold))
)

test('clear a sequence', macro,
  render([].map(renderBold)),
  render(['foo', 'bar'].map(renderBold))
)

test('update items of a sequence', macro,
  render(['baz', 'qux'].map(renderBold)),
  render(['foo', 'bar'].map(renderBold))
)

test('reorder items of a sequence', macro,
  render(['qux', 'baz', 'bar', 'foo'].map(renderBold)),
  render(['foo', 'bar', 'baz', 'qux'].map(renderBold))
)
