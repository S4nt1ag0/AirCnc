const express = require('express');
const mongoose = require('mongoose');
const Routes = require('./routes');
const path = require('path')
const cors = require('cors')
const socketIo = require('socket.io')
const http = require('http')
const User = require('./Models/userModel');
require('dotenv').config();

const app = express(); 
const server = http.Server(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  } 
}); 

io.on('connection', socket => {
    const { user } = socket.handshake.query;
    console.log('Nova conexão, o user:'+ user + ' se conectou pelo id.socer:' + socket.id)
    async function logando() {
    const loggedUser = await User.findOne({_id: user})
    if(loggedUser){
        await User.updateOne(
            {"_id":loggedUser._id},
            {$set:{"SocketId":socket.id}
        })
         await loggedUser.save();
    }
    }
    logando();  
});

app.use((req,res,next)=>{
req.io = io;
return next();
});

mongoose.connect(`${process.env.MONGO_URI}`,{ 
useNewUrlParser: true, useUnifiedTopology: true })
app.use(cors())
app.use(express.json())
app.use('/files', express.static(path.resolve(__dirname,'..','uploads')))
app.use(Routes);
server.listen(3333)