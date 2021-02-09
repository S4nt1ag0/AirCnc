const {Schema, model} = require('mongoose');

const userModel = new Schema({
    email:{
        type:String,
        required:true
    },SocketId: {type:String},
});
module.exports = model('User',userModel);