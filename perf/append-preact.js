import { h, render } from 'preact'

const state = {
  items: []
}

for (let i = 0; i < 10000; i++) {
  state.items.push(i)
}

const renderItem = (item) => h('tr', {}, [
  h('td', {}, `${item}`)
])

console.profile('mount hyperapp')
render(h('main', {},
  h('table', {}, state.items.map(renderItem))
), document.body)
console.profileEnd('mount hyperapp')
