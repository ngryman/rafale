import test from 'ava'
import { nodeToJSON } from './helpers/to-json'
import { html, mount, diff, patch } from '../'

function macro(t, newVTree, oldVTree, html) {
  mount(oldVTree, t.context)
  patch(diff(newVTree, oldVTree))
  t.snapshot(nodeToJSON(t.context))
  t.true(newVTree.domNode.isSameNode(t.context.firstElementChild))
}

const renderPrimitive = (text) => text
const renderBold = (text) => html`<b>${text}</b>`
const renderItalic = (text) => html`<i>${text}</i>`
const wrap = (content) => html`<p>${content}</p>`

test.beforeEach(t => {
  const node = document.createElement('div')
  document.body.appendChild(node)
  t.context = node
})

test.afterEach(t => {
  t.context.remove()
})

test('morph a root component', macro,
  renderItalic('foo'),
  renderBold('foo')
)

test('morph a component', macro,
  wrap(renderItalic('foo')),
  wrap(renderBold('foo')),
)

test('morph a component into a primitive', macro,
  wrap(renderPrimitive('foo')),
  wrap(renderBold('foo'))
)

test('morph a component into a sequence', macro,
  wrap(['foo', 'bar'].map(renderBold)),
  wrap(renderBold('foo'))
)

test('morph a sequence', macro,
  wrap(['foo', 'bar'].map(renderItalic)),
  wrap(['foo', 'bar'].map(renderBold))
)

test('morph a sequence into a component', macro,
  wrap(renderBold('foo')),
  wrap(['foo', 'bar'].map(renderBold))
)

test('morph a sequence into a primitive', macro,
  wrap(renderPrimitive('foo')),
  wrap(['foo', 'bar'].map(renderBold))
)

test('add items to a sequence', macro,
  wrap(['foo', 'bar', 'baz', 'qux'].map(renderBold)),
  wrap(['foo', 'bar'].map(renderBold))
)

test('remove items from a sequence', macro,
  wrap(['foo', 'baz'].map(renderBold)),
  wrap(['foo', 'bar', 'baz', 'qux'].map(renderBold))
)

test('clear a sequence', macro,
  wrap([].map(renderBold)),
  wrap(['foo', 'bar'].map(renderBold))
)

test('update items of a sequence', macro,
  wrap(['baz', 'qux'].map(renderBold)),
  wrap(['foo', 'bar'].map(renderBold))
)

test('reorder items of a sequence', macro,
  wrap(['qux', 'baz', 'bar', 'foo'].map(renderBold)),
  wrap(['foo', 'bar', 'baz', 'qux'].map(renderBold))
)
