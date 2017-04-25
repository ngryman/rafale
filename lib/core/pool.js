export default class Pool {
  constructor(constructor) {
    this.pool = []
    this.top = -1
    this.constructor = constructor
  }

  getInstance(arg1, arg2, arg3) {
    let instance
    if (this.top >= 0) {
      instance = this.pool[this.top--]
    }
    else {
      instance = Object.create({}, this.constructor.prototype)
    }
    this.constructor.call(instance, arg1, arg2, arg3)
    return instance
  }

  recycle(obj) {
    this.pool[++this.top] = obj
  }
}
