import { html, mount, diff, patch } from '../'

const state = {
  items: []
}

for (let i = 0; i < 10000; i++) {
  state.items.push(i)
}

const renderItem = (item) => html`
  <tr><td>${item}</td></tr>
`

const render = (state) => html`
  <main>
    <table>
      ${
        state.items.map(renderItem)
      }
    </table>
  </main>
`

const vtree = render(state)
mount(vtree, document.body)

state.items.length = 0

requestAnimationFrame(() => {
  console.profile('clear')
  const vtree2 = render(state)
  const patches = diff(vtree2, vtree)
  patch(patches)
  requestAnimationFrame(() => console.profileEnd('clear'))
})
