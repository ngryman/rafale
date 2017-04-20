import html from '../html'
import diff from '../diff'
import mount from '../mount'
import patch from '../patch'

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

state.items.splice(10, 0, 'INSERTED')

setTimeout(() => {
  console.profile('insert')
  const vtree2 = render(state)
  const patches = diff(vtree2, vtree)
  patch(patches)
  console.profileEnd('insert')
}, 0)
