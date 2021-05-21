const express = require('express');
const multer = require('multer');
const sessionController = require('./Controllers/sessionController');
const spotController = require('./Controllers/spotController');
const dashboardController = require('./Controllers/dashboardController');
const bookingcontroller = require('./Controllers/bookingController');
const uploadConfig = require('./config/uploads');
const approvalController = require('./Controllers/approvalController')
const rejectionController = require('./Controllers/rejectionController')
const routes = express.Router();
const upload = multer(uploadConfig);
 
routes.post('/login',sessionController.store);

routes.post('/spots', upload.single('thumbmail'),spotController.store);
routes.get('/spots',spotController.index);

routes.get('/dashboardspots',dashboardController.index);

routes.post('/spots/:spot_id/bookings',bookingcontroller.store);
routes.post('/booking/:booking_id/approvals',approvalController.store)
routes.post('/booking/:booking_id/rejections',rejectionController.store)
routes.put('/deleteSpot', spotController.delete)
module.exports=routes;  