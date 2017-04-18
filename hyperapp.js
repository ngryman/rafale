import { h, app } from 'hyperapp'

const state = {
  title: 'Hello World!',
  links: [
    { active: false, href: '/', label: 'Home' }
  ],
  content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
}

const renderContent = (state) => h('p', {}, state.content)

const render = (state) =>
  h('main', {}, [
    h('h1', {}, state.title),
    h('ul', {}, [
      state.links.length > 0
        ? state.links.map(link =>
          link.active
            ? h('b', {}, link.label)
            : h('li', {}, [ h('a', { href: link.href }, link.label) ])
          )
        : 'Empty'
    ]),
    renderContent(state)
  ])

function load1000(state) {
  for (let i = 1; i < 1000; i++) {
    state.links.push({ active: false, label: `LoL ${i}`, href: 'http://leagueoflegends.com' })
  }
  return state
}

setTimeout(() => {
  console.profile('inject')
  app({
    state,
    view: render,
    actions: {
      load1000
    },
    events: {
      loaded: (_, actions) => actions.load1000(),
      action: () => console.profile('patch'),
      render: () => {
        setTimeout(() => console.profileEnd('patch'), 0)
      }
    }
  })
  console.profileEnd('inject')
}, 300)
