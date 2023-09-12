const Booking = require("../Models/Booking");
const Tour = require("../Models/Tour");

exports.getAllBookings = async (req, res, next) => {
    try {
        const userId = req.user._id;

        const userBookings = await Booking.find({ User: userId }).populate({
            path: "Tour",
            model: Tour,
            select: "Price Name"
        });

        res.status(200).json({
            status: "success",
            data: userBookings,
            length: userBookings.length
        });

    } catch (error) {
        next(error)
    }
};
