const {Schema, model} = require("mongoose");

const blockTokenSchema = new Schema({
    token : {type : String, required : true},
})

const tokenBlockModel = model('blockToken', blockTokenSchema);

module.exports = tokenBlockModel;