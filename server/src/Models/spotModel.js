const {Schema, model} = require('mongoose');

const SpotModel = new Schema({
    thumbmail:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    tech:{
        type: [String],
        required:true
    },
    price:{
        type:Number,
    },
    user:{
        type:Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    toJSON:{
        virtuals:true
    },
});

SpotModel.virtual('thumbnail_url').get(function () {
  return `/files/${this.thumbmail}`  
})
module.exports = model('Spot',SpotModel);