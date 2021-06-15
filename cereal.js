console.log('whats up dawg')

const csv = require('csv-parser')
const fs = require('fs')
let cereals = []

const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})
rl.question('How many calories do you want to consume? ', cal => {
    console.log('Try these cereals: ')
    fs.createReadStream('cereal.csv')
        .pipe(csv({}))
        .on('data', (data) => cereals.push(data))
        .on('end', () => {
            let yourCereals = []
            for (let i = 0; i < cereals.length; i++) {
                if (cereals[i].calories <= cal) {
                    yourCereals.push(cereals[i])
                }
            }
            yourCereals.map(cereal => console.log(cereal.name))
        })
    rl.close()
})





