const mongoose = require('mongoose')



if(process.argv.length < 3) {
    console.log('give passowrd as argument')
    process.exit(1)
    
}

const personaSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Persona = mongoose.model('Persona', personaSchema)

const obtenirPersones = () => {
    
    Persona.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(persona => {
            console.log(persona.name, persona.number)            
            
        })
        mongoose.connection.close()
    })
    
}

const insertarPersona = () => {
    
    const persona = new Persona({
        name: process.argv[3],
        number: process.argv[4],
    })

    persona.save().then(result => {
        console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
        mongoose.connection.close()
        
    })
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

