export default class Recycler {
  constructor(ctor) {
    this.pool = []
    this.top = -1
    this.ctor = ctor
  }

  recycle(arg1, arg2, arg3) {
    if (this.top >= 0) {
      const instance = this.pool[this.top--]
      this.ctor.call(instance, arg1, arg2, arg3)
      return instance
    }
    return new this.ctor(arg1, arg2, arg3)
  }

  collect(obj) {
    this.pool[++this.top] = obj
  }
}
