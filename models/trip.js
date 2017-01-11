var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tripSchema = new Schema({
    name: String,
    address: String,
    lat: String,
    long: String,
    admin: Boolean,
    created_at: Date,
    update_at: Date,
});


var Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;