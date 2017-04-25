import { createElement, createText, replace } from './dom'
import Slot, { SLOT_ELEMENT, SLOT_ATTRIBUTE } from './slot'

function Component(uid, template, slots) {
  this.uid = uid
  this.template = template
  this.slots = slots
}

const placeholder = '🦄'

const getUid = (parts) => parts[parts.length / 2 | 0]

const isWhitespace = (c) => (' ' === c || '\n' === c || '\r' === c || '\t' === c)

function markSlots(parts) {
  let html = parts[0].trim()
  for (let i = 1; i < parts.length; i++) {
    for (var j = html.length - 1; i >= 0 && isWhitespace(html[j]); j--);
    // TODO: explain why this trick
    // template is the only tag allowed everywhere and that will not be hoisted
    // not setting a tag in attribute value avoids complication when not double quotes are used
    if ('>' === html[j]) {
      html += `<template>${placeholder}</template>`
    }
    else {
      html += placeholder
    }
    html += parts[i]
  }
  return html
}

function parseHTML(html) {
  const template = createElement('template')
  template.innerHTML = html
  return template
}

function collectSlots(template) {
  const slots = []
  const stack = [template.content.firstElementChild]
  const path = [-1]
  const dummy = createElement('_')

  while (0 !== stack.length) {
    const node = stack.pop()

    if (node.isSameNode(dummy)) {
      path.pop()
      continue
    }

    path[path.length - 1]++

    // ignore text nodes
    if (3 === node.nodeType) continue

    // TODO: no magic value, move licorn somewhere
    if (node.content && placeholder === node.content.firstChild.nodeValue) {
      replace(createText(''), node)
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
    const html = markSlots(parts)
    const template = parseHTML(html)
    const slots = collectSlots(template)
    component = new Component(uid, template, slots)
    registry[uid] = component
  }

  return component
}
