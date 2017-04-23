import test from 'ava'
import { nodeToJSON } from './helpers/to-json'
import { html, mount } from '../'

function macro(t, vtree) {
  mount(vtree, t.context)
  t.snapshot(nodeToJSON(t.context))
}

test.beforeEach(t => {
  const node = document.createElement('div')
  document.body.appendChild(node)
  t.context = node
})

test.afterEach(t => {
  t.context.remove()
})

test('mount a simple component', macro,
  html`<p>foo</p>`
)

test('mount a component with a primitive child', macro,
  html`<b>${'foo'}</b>`
)

test('mount a component with a nested component child', macro,
  html`<p>${
    html`<b>foo</b>`
  }</p>`
)

test('mount a component with a sequence child', macro,
  html`<p>${
    ['foo', 'bar'].map(text =>
      html`<b>${text}</b>`
    )
  }</p>`
)

test('mount a component with a primitive attribute', macro,
  html`<p id="${'foo'}"></p>`
)

test('mount a component with a primitive attribute without quotes', macro,
  html`<p id=${'foo bar'}></p>`
)

test('mount a component with mixed attributes', macro,
  html`<p id="${'foo'}" class="bar"></p>`
)

test('mount a component with a function attribute', macro,
  html`<button onclick=${_ => {}}></button>`
)

test('mount a component with dummy text nodes', macro,
  html`<b>
    ${'foo'}
  </b>`
)

test('mount on document.body by default', t => {
  mount(html`<b>foo</b>`)
  t.is(document.body.lastElementChild.textContent, 'foo')
  document.body.textContent = ''
})
