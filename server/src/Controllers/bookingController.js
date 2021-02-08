const User = require('../Models/userModel');
const Spot = require('../Models/spotModel');
const Booking = require('../Models/bookingModel');

module.exports={
    async store(req,res){
        const {user} = req.headers;
        const {spot_id} = req.params;
        const { date } = req.body;
    
        const booking = await Booking.create({
            date,
            user,
            spot: spot_id,

        })

        await booking.populate('spot').populate('user').execPopulate();
        return res.json(booking)
        } 

}