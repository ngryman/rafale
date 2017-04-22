import Inferno from 'inferno'
import h from 'inferno-create-element'

const state = {
  items: []
}

for (let i = 0; i < 10000; i++) {
  state.items.push(i)
}

const renderItem = (item) => h('tr', { key: item }, [
  h('td', {}, 'number' === typeof item ? item : h('b', {}, item))
])

const root = document.createElement('div')
document.body.appendChild(root)

Inferno.render(h('main', {},
  h('table', {}, state.items.map(renderItem))
), root)

state.items.splice(10, 0, 'INSERTED')

setTimeout(() => {
  console.profile('insert inferno')
  Inferno.render(h('main', {},
    h('table', {}, state.items.map(renderItem))
  ), root)
  requestAnimationFrame(() => console.profileEnd('insert inferno'))
}, 500)
