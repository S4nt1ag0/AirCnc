const express = require('express');
const mongoose = require('mongoose');
const Routes = require('./routes');
const path = require('path')
const cors = require('cors')
require('dotenv').config();

const app = express(); 
mongoose.connect(`${process.env.MONGO_URI}`,{ 
useNewUrlParser: true, useUnifiedTopology: true })
app.use(cors())
app.use(express.json())
app.use('/files', express.static(path.resolve(__dirname,'..','uploads')))
app.use(Routes);
app.listen(3333)