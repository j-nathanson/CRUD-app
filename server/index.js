const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()



// import model
const FoodModel = require('./models/Food')

app.use(morgan('tiny'))
// puts parsed data in req.body.
app.use(express.json())

// cors allows use to communicate with API's we create
app.use(cors())

// connect to cloud server throwaway password. 
mongoose.connect('mongodb+srv://newuser:uxGmF423mwI4WKcf@crud.r0dg1.mongodb.net/food?retryWrites=true&w=majority', {
    useNewUrlParser: true
})

// listen for the POST'/insert request
app.post('/insert', async (req, res) => {

    // after parsing from JSON store inputted values
    const foodName = req.body.foodName;
    const days = req.body.days;

    // place inputted values into a FoodModel for the database
    const food = new FoodModel({
        foodName: foodName,
        daysSinceIAte: days
    })
    try {
        // attempt to save food to the collection
        await food.save();
        res.send('inserted data')
    } catch (err) {
        console.log(err)
    }


})


app.listen(3001, () => {
    console.log('Server running on port 3001');
})