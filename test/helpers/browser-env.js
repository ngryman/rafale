require('browser-env')()

Node.prototype.isSameNode = function(node) {
  return (this === node)
}

global.requestAnimationFrame = setImmediate
