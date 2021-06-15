const csv = require('csv-parser')
const fs = require('fs')
const process = require('process')
let cereals = []

let calories = parseInt(process.argv[2])

fs.createReadStream('cereal.csv')
    .pipe(csv({}))
    .on('data', (data) => cereals.push(data))
    .on('end', () => {
        let limit = calories - 100
        let yourCereals = cereals.filter(cal => (cal.calories <= calories || cal.calories >= limit))

        let bestCereal = { rating: 0 }
        for (let k = 0; k < yourCereals.length; k++) {
            if (yourCereals[k].rating > bestCereal.rating) {
                bestCereal = yourCereals[k]
            }
        }
        console.log(bestCereal.name + '- Calories: ' + bestCereal.calories + ' Rating: ' + bestCereal.rating + ' out of 100')
    })






