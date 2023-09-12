const Testing = require("../Models/Testing");

exports.createTest= async (req, res, next) => {
    try {
        const response = await Testing.create(req.body); // Assuming Testing has a static method 'create' to save data
        res.status(201).json({
            status: "success",
            data: response
        });
    } catch (error) {
        next(error);
    }
};
