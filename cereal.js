const fs = require('fs')

//split csv up by \r (carrige return, when the page moves back to left side, shows up at end of line)
//and \n, newline (this shows up at the beginning of the newline)
let cerealData = fs.readFileSync('cereal.csv', 'utf8').split('\r\n')
//get the data keys from the first line
const cerealKey = cerealData[0].split(',')
//remove they key line from start of array
cerealData.shift()

//split the cereal data strings into arrays
for (let i = 0; i < cerealData.length; i++) {
    cerealData[i] = cerealData[i].split(',')
}

//change cereal array into objects with key value pairs
for (let j = 0; j < cerealData.length; j++) {
    //grab data from cereal and save it
    let arrEle = cerealData[j]
    //clear the data from array to make room for object key value pairs
    cerealData[j] = {}
    for (let k = 0; k < cerealKey.length; k++) {
        //obj["keyname"] = value
        //add key value pairs from data back to cereal array
        cerealData[j][cerealKey[k]] = arrEle[k]
    }
}


let cal = parseInt(process.argv[2])

cerealData.forEach(element => {
    if (isNaN(element.calories)) {
        console.log(element)
    }
    //console.log(element.calories)
})

/*

cerealData.sort((a, b) => { return b.calories - a.calories }) //sorts cereals by calories in descending order 
//sets calories to highest value from data set if user input is higher than it
if (cal > cerealData[0].calories) {
    cal = cerealData[0].calories
    console.log('Calories too high, brought down to ' + cerealData[0].calories + 'calories.')
}


//sets lower bound limit on calorie intake
let limit = cal - 100
//creates new array with only cereals in calorie bounds
let yourCereals = cerealData.filter(calCheck => {
    return calCheck.calories <= cal && calCheck.calories >= limit
})
//checks for highest rating cereal in your cereal list
yourCereals.sort((a, b) => { return b.rating - a.rating })
console.log(yourCereals[0].name + ': Calories- ' + yourCereals[0].calories + ' Rating- ' + yourCereals[0].rating + ' out of 100;')
*/