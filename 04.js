require('./utils/dirty-tricks')
const fs = require('fs')

const input = fs.readFileSync('./inputs/04.txt', 'utf-8')

const output = Array.from(input.matchAll(/(\d+)-(\d+),(\d+)-(\d+)/g), ([...a]) => (a.slice(1,5).map(n=>parseInt(n))))
    .reduce((acc, [aMin, aMax, bMin, bMax]) => {
        if(aMin <= bMin && aMax >= bMax || bMin <= aMin && bMax >= aMax) {
            acc++
        }
        return acc
    },0)

console.log(output)

const output2 = Array.from(input.matchAll(/^(\d+)-(\d+),(\d+)-(\d+)$/gm), ([...a]) => (a.slice(1,5).map(n=>parseInt(n))))
    .reduce((acc, [aMin, aMax, bMin, bMax]) => {
        if(aMin >= bMin && aMin <= bMax || aMax >= bMin && aMax <= bMax || bMin >= aMin && bMin <= aMax || bMax >= aMin && bMax <= aMax) {
            acc++
        }
        return acc
    },0)

console.log(output2)
