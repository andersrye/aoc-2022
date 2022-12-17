const fs = require('fs')
const input = fs.readFileSync('./inputs/01.txt', 'utf-8')

const output = input.trim()
    .split('\n\n')
    .map(s=>s.split('\n'))
    .map(l=>l.reduce((acc, n)=>(acc+parseInt(n)), 0))
    .reduce((acc, n)=>(acc>n?acc:n),0)
console.log(output)

const output2 = input.trim()
    .split('\n\n')
    .map(s=>s.split('\n'))
    .map(l=>l.reduce((acc, n)=>(acc+parseInt(n)), 0))
    .sort((a,b)=>a>b?1:-1)
    .slice(-3)
    .reduce((acc,n)=>(acc+n),0)

console.log(output2)
