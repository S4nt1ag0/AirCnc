const {Schema, model} = require('mongoose');

const BookingModel = new Schema({
    date:{
        type:String,
        required:true
    },
    approved: Boolean,
    user:{
        type:Schema.Types.ObjectId,
        ref: 'User'
    },
    spot:{
        type:Schema.Types.ObjectId,
        ref: 'Spot'
    }
});
module.exports = model('Booking',BookingModel);