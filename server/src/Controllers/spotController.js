const Spot = require('../Models/spotModel');
module.exports={
    async index(req,res){
        const {techs} = req.query;

        const spots = await Spot.find({tech: techs})
        return res.json(spots)
    },

    async store(req,res){
        const {filename} = req.file;
        const {company, techs, price}=req.body;
        const {user} = req.headers;
    
        const spot = await Spot.create({
            user,
            thumbmail: filename,
            company,
            tech: techs.split(',').map(tech => tech.trim()),
            price
        });
    
        return res.json(spot)

    }
} 