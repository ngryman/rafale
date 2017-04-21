import { html, mount } from '../'

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

requestAnimationFrame(() => {
  console.profile('mount')
  const vtree = render(state)
  mount(vtree, document.body)
  requestAnimationFrame(() => console.profileEnd('mount'))
})
