import Inferno from 'inferno'
import h from 'inferno-create-element'

const state = {
  items: []
}

for (let i = 0; i < 10000; i++) {
  state.items.push(i)
}

const renderItem = (item) => h('tr', {}, [
  h('td', {}, `${item}`)
])

const root = document.createElement('div')
document.body.appendChild(root)

Inferno.render(h('main', {},
  h('table', {}, state.items.map(renderItem))
), root)

state.items.length = 0

requestAnimationFrame(() => {
  console.profile('clear inferno')
  Inferno.render(h('main', {},
    h('table', {}, state.items.map(renderItem))
  ), root)
  requestAnimationFrame(() => console.profileEnd('clear inferno'))
})
