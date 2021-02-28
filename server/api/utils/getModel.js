const mongoose = require('mongoose');

function getModelByName(name) {
    return mongoose.model(name);
}

module.exports = {
    getModelByName
}