import { h, render, Component } from 'preact'

const state = {
  items: []
}

for (let i = 0; i < 10000; i++) {
  state.items[i] = i
}

class Table extends Component {
  constructor() {
    super()
    this.state = state
  }

  componentDidMount() {
    for (let i = 0; i < 10000; i++) {
      if (0 === i % 100) {
        state.items[i] += 'prout'
      }
    }

    setTimeout(() => {
      console.profile('update preact')
      this.setState(state)
    }, 0)
  }

  componentDidUpdate() {
    console.profileEnd('update preact')
  }

  renderItem(item) {
    return h('tr', {}, [
      h('td', {}, `${item}`)
    ])
  }

  render(props, state) {
    return h('main', {},
      h('table', {}, this.state.items.map(item => this.renderItem(item)))
    )
  }
}

console.profile('update preact')
render(h(Table), document.body)
console.profileEnd('update preact')
