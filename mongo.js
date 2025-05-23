const mongoose = require('mongoose')



if(process.argv.length < 3) {
    console.log('give passowrd as argument')
    process.exit(1)

}

const personSchema = new mongoose.Schema({
    name: {
            type: String,
            minLength: [3, 'The value must have more than 3 characters, current value {VALUE}']
        },
    number: String,
})

const Person = mongoose.model('Person', personSchema)

const obtenirPersones = () => {

    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {
            console.log(person.name, person.number)

        })
        mongoose.connection.close()
    })

}

const insertarPersona = () => {

    Person.find({ name: process.argv[3] }).then(person => {
        //console.log(person);
        if(person.length > 0) {
            console.log('name must be unique')
        } else {
            const person = new Person({
            name: process.argv[3],
            number: process.argv[4],
            })

            person.save().then(result => {
            console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
            mongoose.connection.close()
            })
        }
        //mongoose.connection.close()
    })

    /* const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })

    person.save().then(result => {
        console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
        mongoose.connection.close()

    }) */
}

const mongooseConection = () => {
    const password = process.argv[2]

    const url = `mongodb+srv://fullstack:${password}@cluster0.euv0sm1.mongodb.net/personApp?retryWrites=true&w=majority&appName=Cluster0`

    mongoose.set('strictQuery', false)

    mongoose.connect(url)
}

if(process.argv.length === 3) {
    mongooseConection()
    obtenirPersones()
}

if (process.argv.length === 5) {
    mongooseConection()
    insertarPersona()
}

if(process.argv.length > 5) {
    console.log('give passowrd as argument')
    process.exit(1)
}

