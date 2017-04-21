// TODO: DOMParser error handling: https://gist.github.com/lygaret/a68220defa69174bdec5

export default function parseDOM(markup) {
  // const parser = new DOMParser()
  // const doc = parser.parseFromString(markup, 'text/html')
  // return doc

  const template = document.createElement('template')
  template.innerHTML = markup
  return template
}
