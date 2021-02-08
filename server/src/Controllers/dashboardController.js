const User = require('../Models/userModel');
const Spot = require('../Models/spotModel');

module.exports={
    async index(req,res){
        const {user} = req.headers;

        const spots = await Spot.find({user})
    
        return res.json(spots)
        } 

}
    
