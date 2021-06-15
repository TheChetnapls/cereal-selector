const csv = require('csv-parser')
const fs = require('fs')
const prompt = require('prompt')
const process = require('process')
let cereals = []

prompt.start()

prompt.get('calories', function (err, calories) {
    if (err) { return onErr(err); }

    fs.createReadStream('cereal.csv')
        .pipe(csv({}))
        .on('data', (data) => cereals.push(data))
        .on('end', () => {
            let yourCereals = []
            for (let i = 0; i < cereals.length; i++) {
                if (cereals[i].calories <= calories) {
                    yourCereals.push(cereals[i])
                }
            }
            let bestCereal = { rating: 0 }
            for (let k = 0; k < yourCereals.length; k++) {
                if (yourCereals[k].rating > bestCereal.rating) {
                    bestCereal = yourCereals[k]
                }
            }
            console.log(bestCereal.name + '- Calories: ' + bestCereal.calories + ' Rating: ' + bestCereal.rating + ' out of 100')
        })

})

function onErr(err) {
    console.log(err);
    return 1;
}






