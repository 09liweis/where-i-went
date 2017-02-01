var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tripSchema = new Schema({
    name: String,
    photo: String,
    description: String,
    address: String,
    lat: String,
    long: String,
    routes: [{
        name: String,
        address: String,
        lat: String,
        long: String,
        photo: String,
    }],
    created_at: Date,
    update_at: Date,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
});

var Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;