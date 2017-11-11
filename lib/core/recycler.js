export default class Recycler {
  constructor(ctor) {
    this.pool = []
    this.top = -1
    this.ctor = ctor
  }

  recycle() {
    const instance = this.top >= 0
      ? this.pool[this.top--]
      : Object.create(this.ctor.prototype)

    this.ctor.apply(instance, arguments)
    return instance
  }

  collect(obj) {
    this.pool[++this.top] = obj
  }
}
