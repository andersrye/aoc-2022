require('./utils/dirty-tricks')
const fs = require('fs')

const [stacksInput, rulesInput] = fs.readFileSync('./inputs/05.txt', 'utf-8').split("\n\n")

const stacks1 = stacksInput
    .split('\n')
    .flatMap((s, i) => Array.from(s.matchAll(/[A-Z]/g)).map((r)=>[r[0],Math.floor(r.index-1)/4+1, i]))
    .reduce((acc, [letter, column, i]) => {
        acc[column] = (acc[column]??[])
        acc[column][i] = letter
        return acc
    }, [])
    .map(a=>a.reverse().filter(n=>n))

const stacks2 = structuredClone(stacks1)

function move1(stacks, times, from, to) {
    stacks[to].push(...stacks[from].splice(-times).reverse())
}

function move2(stacks, times, from, to) {
    stacks[to].push(...stacks[from].splice(-times))
}

Array.from(rulesInput.matchAll(/move (\d+) from (\d+) to (\d+)/gm))
    .map(([,a,b,c])=>[a,b,c].map(n=>parseInt(n)))
    .forEach(([times, from, to]) => {
        move1(stacks1, times, from, to)
        move2(stacks2, times, from, to)
    })

console.log(`part 1 = ${stacks1.map(a=>a.pop()).join("")}`)
console.log(`part 2 = ${stacks2.map(a=>a.pop()).join("")}`)