const isWhitespace = (c) => (' ' === c) || ('\n' === c) || ('\r' === c) || ('\t' === c)

export default function dispatchSlots(parts, placeholder) {
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
