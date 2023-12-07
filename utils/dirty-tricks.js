Array.prototype.chunk = function(chunkSize) {
  return this.reduce((acc, item, index) => {
      if(index % chunkSize === 0) {
          acc.push([item])
      } else {
          acc[Math.floor(index/chunkSize)].push(item)
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
    for (const val of this) {
        acc = fn(acc, val)
    }
    return acc
}