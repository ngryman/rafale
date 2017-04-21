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

requestAnimationFrame(() => {
  console.profile('mount inferno')
  Inferno.render(h('main', {},
    h('table', {}, state.items.map(renderItem))
  ), root)
  requestAnimationFrame(() => console.profileEnd('mount inferno'))
})
