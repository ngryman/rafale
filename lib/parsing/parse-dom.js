// TODO: DOMParser error handling: https://gist.github.com/lygaret/a68220defa69174bdec5

export default function parse(markup) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(markup, 'text/html')
  return doc.body.firstChild
}