import Slot, { SLOT_ELEMENT, SLOT_ATTRIBUTE } from './Slot'

export class Component {
  constructor(uid, template, slots) {
    this.uid = uid
    this.template = template
    this.slots = slots
  }
}

const placeholder = '🦄'

const getUid = (parts) => parts[parts.length / 2 | 0]

const isWhitespace = (c) => (' ' === c || '\n' === c || '\r' === c || '\t' === c)

function dispatchSlots(parts, placeholder) {
  let markup = parts[0].trim()
  for (let i = 1; i < parts.length; i++) {
    for (var j = markup.length - 1; i >= 0 && isWhitespace(markup[j]); j--);
    // TODO: explain why this trick
    // template is the only tag allowed everywhere and that will not be hoisted
    // not setting a tag in attribute value avoids complication when not double quotes are used
    if ('>' === markup[j]) {
      markup += `<template>${placeholder}</template>`
    }
    else {
      markup += placeholder
    }
    markup += parts[i]
  }
  return markup
}

function parseMarkup(markup, placeholder) {
  const template = document.createElement('template')
  template.innerHTML = markup
  return template
}

function collectSlots(template, placeholder) {
  const slots = []
  const stack = [template.content.firstElementChild]
  const path = [-1]
  const dummy = document.createElement('_')

  while (0 !== stack.length) {
    const node = stack.pop()

    if (node.isSameNode(dummy)) {
      path.pop()
      continue
    }

    path[path.length - 1]++

    // if (3 === node.nodeType) continue

    // TODO: no magic value, move licorn somewhere
    if (node.content && '🦄' === node.content.firstChild.nodeValue) {
      node.parentNode.replaceChild(document.createTextNode(''), node)
      slots.push(new Slot(SLOT_ELEMENT, null, path.slice(1)))
      continue
    }

    for (let i = 0; i < node.attributes.length; i++) {
      const attribute = node.attributes[i]
      if (attribute.value === placeholder) {
        slots.push(new Slot(SLOT_ATTRIBUTE, attribute.name, path.slice(1)))
      }
    }

    if (0 !== node.children.length) {
      stack.push(dummy)
      for (let i = node.childNodes.length - 1; i >= 0; i--) {
        stack.push(node.childNodes[i])
      }
      path.push(-1)
    }
  }

  return slots
}

const registry = []

export function createComponent(parts) {
  const uid = getUid(parts)

  let component = registry[uid]
  if (!component) {
    const markup = dispatchSlots(parts, placeholder)
    const template = parseMarkup(markup, placeholder)
    const slots = collectSlots(template, placeholder)
    component = new Component(uid, template, slots)
    registry[uid] = component
  }

  return component
}
