import { h, render, Component } from 'preact'

const state = {
  items: []
}

for (let i = 0; i < 10000; i++) {
  state.items.push(i)
}

class Table extends Component {
  constructor() {
    super()
    this.state = state
  }

  componentDidMount() {
    state.items.splice(10, 0, 'INSERTED')
    this.setState(state)
  }

  componentWillUpdate() {
    console.profile('insert preact')
  }

  componentDidUpdate() {
    requestAnimationFrame(() => console.profileEnd('insert preact'))
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

render(h(Table), document.body)
