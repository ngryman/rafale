import html from './html'
import diff from './diff'
import patch from './patch'
import mount from './mount'

const state = {
  title: 'Hello World!',
  links: [
    { active: false, href: '/', label: 'Home' }
  ],
  content:
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.'
}

const renderContent = (state) => html`
  <p>${state.content}</p>
`

const render = (state) => html`
  <main>
    <h1>${state.title}</h1>
    <ul>
      ${
        state.links.length > 0
          ? state.links.map(link =>
            link.active
              ? html`<b>${link.label}</b>`
              : html`<li><a href="${link.href}">${link.label}</a></li>`
            )
          : 'Empty'
      }
    </ul>
    ${renderContent(state)}
  </main>
`

setTimeout(() => {
  console.profile('inject')
  const oldRoot = render(state)
  mount(oldRoot, document.body)
  console.profileEnd('inject')

  // state.links[0] = { active: true, label: 'Sweet Home!', href: '/home' }
  for (let i = 1; i < 1000; i++) {
    state.links.push({ active: false, label: `LoL ${i}`, href: 'http://leagueoflegends.com' })
  }

  // state.links.length = 0

  console.profile('patch')
  const newRoot = render(state)
  const patches = diff(newRoot, oldRoot)
  patch(patches)
  console.profileEnd('patch')
}, 300)
