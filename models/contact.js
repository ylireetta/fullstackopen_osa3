// MongoDB-asiat
const mongoose = require('mongoose')

// Ympäristömuuttuja, jok haetaan .env-tiedostosta
const url = process.env.MONGODB_URI

console.log('connecting to MongoDB')
mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const contactSchema = new mongoose.Schema({
    name: String,
    number: String
})

// Muotoillaan palautettavien objektien muotoa: otetaan MongoDB:n id-kenttä objektin id:ksi frontendiä varten ja poistetaan turhia kenttiä
contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Contact', contactSchema)