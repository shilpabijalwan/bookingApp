const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: mongoose.SchemaTypes.String,
    phone: mongoose.SchemaTypes.Number,
    phonecode: mongoose.SchemaTypes.Number,
    password: mongoose.SchemaTypes.String,
    role: {
        type: mongoose.SchemaTypes.String,
        enum: ['admin','user','instructor'],
        default: 'user'
    }

})