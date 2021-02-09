const Booking = require('../Models/bookingModel');

module.exports={
    async store(req,res){
        const {booking_id} = req.params;

        const booking = await Booking.findOne({_id: booking_id}).populate('spot');

        booking.approved = false;

        const ownerBooking = User.findOne({_id:booking.user._id})

        if(ownerBooking.SocketId){
            console.log('entrou no reject')
            req.io.to(ownerBooking.SocketId).emit('booking_result', booking);
        }

        await booking.save()

        return res.json(booking)


    }
}