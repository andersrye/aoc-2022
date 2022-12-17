require('./utils/dirty-tricks')
const fs = require('fs')
const input = fs.readFileSync('./inputs/03.txt', 'utf-8')

function priority(char) {
    const c = char.charCodeAt(0)
    return c < 97 ? c - 38 : c - 96;
}

const output = input
    .trim()
    .split('\n')
    .map(s => [s.slice(0,s.length/2), s.slice(s.length/2)])
    .map(([a,b]) => [...a].find(x=>b.includes(x)))
    .map(priority)
    .reduce((acc,n)=>(acc+n),0)

console.log(output)

const output2 = input
    .trim()
    .split('\n')
    .chunk(3)
    .map(([a,b,c])=> [...a].find(x => b.includes(x) && c.includes(x)))
    .map(priority)
    .reduce((acc,n)=>(acc+n),0)


console.log(output2)