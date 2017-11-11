import test from 'ava'
import { vnodeToJSON } from './helpers/to-json'
import { html } from '../index'

const noop = () => {}

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
  html`<button onclick=${noop}></button>`
)

test('create a component with dummy text nodes', macro,
  html`<b>
    ${'foo'}
  </b>`
)

test('remove function attributes but keep others', macro,
  html`<button onclick=${noop} class="foo"></button>`
)
