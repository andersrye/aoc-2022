require('./utils/dirty-tricks')
const fs = require('fs')

const trees = fs.readFileSync('./inputs/08.txt', 'utf-8')
    .split("\n")
    .map(row => row.split(""))

function* up(m, x, y) {
    let c
    while (c = m[y--]?.[x]) {
        yield c
    }
}

function* down(m, x, y) {
    let c
    while (c = m[y++]?.[x]) {
        yield c
    }
}

function* left(m, x, y) {
    let c
    while (c = m[y]?.[x--]) {
        yield c
    }
}

function* right(m, x, y) {
    let c
    while (c = m[y]?.[x++]) {
        yield c
    }
}

function countVisible(trees) {
    const first = trees.next().value
    let count = 0
    for (const tree of trees) {
        count++
        if (tree >= first) break
    }
    return count
}

const answer = trees.flatMap((row, y) =>
    row.map((_, x) =>
        [up, down, left, right]
            .map(g => g(trees, x, y))
            .map(countVisible)
            .reduce((acc, val) => acc * val)
    )).reduce((max, val) => val > max ? val : max)

console.log(`Part 2 answer: ${answer}`)