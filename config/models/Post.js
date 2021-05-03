const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const plc_s71200Data = new Schema({
    name: { type: String, require: true},
    description: { type: String, maxLength: 600, require: true },
    image: { type: String, maxLength: 255, require: true },
    videoID: { type: String, require: true },
    level: { type: String, maxLength: 255, require: true },
    
});

module.exports = mongoose.model('plc_s71200', plc_s71200Data);
