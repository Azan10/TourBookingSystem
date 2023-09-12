const express = require('express');
const app = express();
const cors = require('cors');
const authRouter = require('./Routes/AuthRoutes');
const tourRouter = require('./Routes/TourRoutes');
const reviewRouter = require('./Routes/ReviewRoutes');
const userRouter=require("./Routes/UserRoutes")
const bookingRouter=require("./Routes/BookingRoutes")
const testRouter = require("./Routes/TestingRoutes");
const Globalhandler = require('./Globalhandler');
const GetBookingRouter=require("./Routes/GetBookingRoute");
const AppError = require('./AppError');



// CORS setup
app.use(cors({
    origin: true, // This should be the URL of your client if it's different than your server.
    credentials: true // Allow servers to receive the cookie from the client
}));
app.use("/",bookingRouter)

app.use(express.json());



app.use('/', authRouter);
app.use('/', tourRouter);
app.use('/', reviewRouter);
app.use("/", testRouter);
app.use("/",userRouter)
app.use("/",GetBookingRouter)
app.all('*',(req,res,next)=>{
    next(new AppError("route doesnt mathches with the server",404))
})
app.use(Globalhandler.errorHandler);
// Error handler should be the last middleware


module.exports = app;

