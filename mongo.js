const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const givenName = process.argv[3] // Komentorivillä annettu parametri
const givenNumber = process.argv[4] // Komentorivillä annettu parametri

// Huomaa erikoishipsut, jotka mahdollistavat parametrien syöttämisen keskelle stringiä
const url = `mongodb+srv://fullstack_user:${password}@cluster0.cpadv.mongodb.net/contact-app?retryWrites=true&w=majority`

mongoose.connect(url)

const contactSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Contact = mongoose.model('Contact', contactSchema)

if (givenName !== null && givenNumber !== null) {
    const contact = new Contact({
        name: givenName,
        number: givenNumber
    })

    contact.save()
        .then(savedContact => {
            console.log(`added ${savedContact.name} number ${savedContact.number} to phonebook`)
            mongoose.connection.close()
        })
}
else {
    Contact.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(contact => {
            console.log(`${contact.name} ${contact.number}`)
        })
        mongoose.connection.close()
    })
}
