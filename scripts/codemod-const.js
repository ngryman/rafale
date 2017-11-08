export default (file, api) => {
  const j = api.jscodeshift
  const constants = new Map()
  const code = j(file.source)

  code
    .findVariableDeclarators()
    .filter(path => {
      const node = path.value
      const name = node.id.name
      const init = node.init

      if (name.toUpperCase() === name && !init.regex) {
        console.log(`Inlining constant: ${name}=${init.raw}`)
        constants.set(name, init)
        return true
      }
    })
    .remove()

  code
    .find(j.Identifier)
    .filter(path => constants.has(path.value.name))
    .replaceWith(path => constants.get(path.value.name))

  return code.toSource({ quote: 'single' })
}
