const fs = require('fs')
const input = fs.readFileSync('./inputs/02.txt', 'utf-8')

const output = input.trim()
    .split('\n')
    .map(r=>r.split(' ').map((s,i)=>(s.charCodeAt(0)+i+1)%3))
    .map(([a,b])=>(a===b?3:a===(b+1)%3?0:6)+b+1)
    .reduce((acc,n)=>acc+n)

console.log(output)

const output2 = input.trim()
    .split('\n')
    .map(r=>r.split(' '))
    .map(([a,b])=> {
        let score
        if(a === 'B' && b === 'X' || a === 'A' && b === 'Y' || a === 'C' && b === 'Z') {
            score = 1
        } else if(a === 'C' && b === 'X' || a === 'B' && b === 'Y' || a === 'A' && b === 'Z') {
            score = 2
        } else score = 3
        if(b ==='Y') score +=3
        if(b ==='Z') score +=6
        return score
    })
    .reduce((acc,n)=>(acc+n))

console.log(output2)


