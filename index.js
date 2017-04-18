import html from './html'
import diff from './diff'
import patch from './patch'
import { inject } from './lib/patching'

const state = {
  title: 'Hello World!',
  links: [
    { href: '/', label: 'Home' }
  ],
  content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
}

const renderContent = (state) => html`
  <p>${state.content}</p>
`

const render = (state) => html`
  <main>
    <h1>${state.title}</h1>
    <ul>
      ${state.links.map(link => html`<li><a href="${link.href}">${link.label}</a></li>`)}
    </ul>
    ${renderContent(state)}
  </main>
`

console.profile('inject')
const oldRoot = render(state)
inject(oldRoot, document.body.firstChild, true)
console.profileEnd('inject')

state.links[0] = { label: 'Sweet Home!', href: '/home' }
state.links.push({ label: 'LoL', href: 'http://leagueoflegends.com' })

console.profile('diff/patch')
const newRoot = render(state)
const patches = diff(newRoot, oldRoot)
patch(patches)
console.profileEnd('diff/patch')

// const oldRoot = render(state)
// // patch(document.body, oldRoot, null)
//
// state.content = 'Coucou !'
// state.links[0] = { label: 'Sweet Home!', href: '/home' }
// state.links.push({ label: 'LoL', href: 'http://leagueoflegends.com' })
// const newRoot = render(state)
//
// const patches = diff(newRoot, oldRoot)
// console.log(patches)
// // patch(document.body, patches)
