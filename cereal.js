const csv = require('csv-parser')
const fs = require('fs')
const process = require('process')
let cereals = []

//take user calorie limit
let cal = parseInt(process.argv[2])

fs.createReadStream('cereal.csv')
    .pipe(csv({}))
    .on('data', (data) => cereals.push(data)) //pushes data into existing array, as it reads the data
    .on('end', () => { //happens on end, when there's no more data to be read

        cereals.sort((a, b) => { return b.calories - a.calories }) //sorts cereals by calories in descending order 
        //sets calories to highest value from data set if user input is higher than it
        if (cal > cereals[0].calories) {
            cal = cereals[0].calories
            console.log('Calories too high, brought down to ' + cereals[0].calories + 'calories.')
        }

        //sets lower bound limit on calorie intake
        let limit = cal - 100
        //creates new array with only cereals in calorie bounds
        let yourCereals = cereals.filter(calCheck => {
            return calCheck.calories <= cal && calCheck.calories >= limit
        })
        //checks for highest rating cereal in your cereal list
        yourCereals.sort((a, b) => { return b.rating - a.rating })
        console.log(yourCereals[0].name + ': Calories- ' + yourCereals[0].calories + ' Rating- ' + yourCereals[0].rating + ' out of 100;')
        /*         let bestCereal = { rating: 0 }
                for (let k = 0; k < yourCereals.length; k++) {
                    if (yourCereals[k].rating > bestCereal.rating) {
                        bestCereal = yourCereals[k]
                    }
                }
                console.log(bestCereal.name + '- Calories: ' + bestCereal.calories + ' Rating: ' + bestCereal.rating + ' out of 100') */
    })