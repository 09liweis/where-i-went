var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var photoSchema = new Schema({
    alt: String,
    description: String,
    title: String,
    url: String,
    created_at: Date,
    update_at: Date,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
});

var Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;