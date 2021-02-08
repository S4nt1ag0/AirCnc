const User = require('../Models/userModel');
module.exports={
    async store(req,res){
        const {email} = req.body;
        const userExist = await User.findOne({email})
        if(userExist){
            return res.json(userExist)
        }else{
        const user = await User.create({ email })
        return res.json(user)
        }

     }
    
}