// MongoDB-asiat
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// Ympäristömuuttuja, jok haetaan .env-tiedostosta
const url = process.env.MONGODB_URI

console.log('connecting to MongoDB')
mongoose.connect(url)
    .then(console.log('connected to MongoDB'))
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const contactSchema = new mongoose.Schema({
    name: { type: String, unique: true, minlength: 3 },
    number: { type: String, minlength: 8 }
})

// Muotoillaan palautettavien objektien muotoa: otetaan MongoDB:n id-kenttä objektin id:ksi frontendiä varten ja poistetaan turhia kenttiä
contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

contactSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Contact', contactSchema)