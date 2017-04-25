import test from 'ava'
import { vnodeToJSON } from './helpers/to-json'
import { html } from '../'

function macro(t, vtree) {
  t.snapshot(vnodeToJSON(vtree))
}

test('create a simple component', macro,
  html`<b>foo</b>`
)

test('create a component with a primitive child', macro,
  html`<b>${'foo'}</b>`
)

test('create a component with a nested component child', macro,
  html`<p>${
    html`<b>foo</b>`
  }</p>`
)

test('create a component with a sequence child', macro,
  html`<p>${
    ['foo', 'bar'].map(text =>
      html`<b>${text}</b>`
    )
  }</p>`
)

test('create a component with a primitive attribute', macro,
  html`<p id="${'foo'}"></p>`
)

test('create a component with a primitive attribute without quotes', macro,
  html`<p id=${'foo bar'}></p>`
)

test('create a component with mixed attributes', macro,
  html`<p id="${'foo'}" class="bar"></p>`
)

test('create a component with a function attribute', macro,
  html`<button onclick=${_ => {}}></button>`
)

test('create a component with dummy text nodes', macro,
  html`<b>
    ${'foo'}
  </b>`
)

test('coerce a number primitive to string', t => {
  const vtree = html`<b>${1}</b>`
  t.true('string' === typeof vtree.children[0].value)
})

test('keep a function primitive as is', t => {
  const vtree = html`<b onclick="${_ => {}}"></b>`
  t.true('function' === typeof vtree.children[0].value)
})
