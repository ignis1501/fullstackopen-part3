const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

//console.log(process.env['MONGODB_URI'])

const url = process.env['MONGODB_URI']

console.log('connecting to', url)


mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')        
    })
    .catch(error => {
        console.log('error connecting to MongoDB: ', error.message)        
    })

    const personSchema = new mongoose.Schema({
        name: {
            type: String,
            minLength: [3, 'The value must have more than 3 characters, current value {VALUE}']
        },
        number: {
            type: String,
            validate: {
                validator: function(v) {
                    return /\d{2,3}[-]\d*/.test(v);
                },
                message: 'Provided phone number is invalid.'
            },
        }
    })

    personSchema.set('toJSON', {
        transform: (document, returnedObject) => {
            returnedObject.id = returnedObject._id.toString()
            delete returnedObject._id
            delete returnedObject.__v
        }
    })

    module.exports = mongoose.model('Person', personSchema)