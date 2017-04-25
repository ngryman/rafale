export default class Recycler {
  constructor(ctor) {
    this.pool = []
    this.top = -1
    this.ctor = ctor
  }

  create(arg1, arg2, arg3) {
    let instance
    if (this.top >= 0) {
      instance = this.pool[this.top--]
    }
    else {
      instance = Object.create({}, this.ctor.prototype)
    }
    this.ctor.call(instance, arg1, arg2, arg3)
    return instance
  }

  collect(obj) {
    this.pool[++this.top] = obj
  }
}
