Array.prototype.chunk = function(chunkSize) {
  return this.reduce((acc, l, i) => {
      if(i % chunkSize === 0) {
          acc.push([l])
      } else {
          acc[Math.floor(i/chunkSize)].push(l)
      }
      return acc
  }, [])
}

const Generator = Object.getPrototypeOf(function* () {})

Generator.prototype.map = function* (fn) {
    for (const val of this) {
        yield fn(val)
    }
}

Generator.prototype.reduce = function (fn, acc) {
    return [...this].reduce(fn, acc)
}