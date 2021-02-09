const Booking = require('../Models/bookingModel');
const User = require('../Models/userModel');

module.exports={
    async store(req,res){
        const {booking_id} = req.params;

        const booking = await Booking.findOne({_id: booking_id}).populate('spot');

        booking.approved = true;

        console.log ('entrou na labaxuria'+ booking.user._id)

        const ownerBooking = await User.findOne({_id:booking.user._id})
    console.log(ownerBooking)
        if(ownerBooking.SocketId){
            console.log('entrou no approved')
            req.io.to(ownerBooking.SocketId).emit('booking_result', booking);
        }

        await booking.save()

        return res.json(booking)


    }
} 