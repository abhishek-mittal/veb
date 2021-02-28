const {Schema, model} = require('mongoose');

const employeeSchema = new Schema({
    name: String,
    pos: String,
    department: String,
    reporting: String,
    isReporting: Boolean
}, {
    timestamps: true
})

// const Employee = new model('Employee', employeeSchema);
module.exports = ['Employee', employeeSchema];