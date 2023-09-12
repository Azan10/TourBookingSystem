const mongoose=require("mongoose");
const Tour = require("./Tour");

const reviewSchema = new mongoose.Schema({
    ReviewText: {
        type: String,
        required: true
    },
    ReviewRating: {
        type: Number,
        required: true
    },
    Tour: {
        type: mongoose.Schema.ObjectId,
        ref: "Tour"
    },
    User: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }
});

reviewSchema.statics.calcAverageRatings = async function(tourId) {
    const stats = await this.aggregate([
        {
            $match: { Tour: tourId }
        },
        {
            $group: {
                _id: '$Tour',
                nRating: { $sum: 1 },
                avgRating: { $avg: '$ReviewRating' }
            }
        }
    ]);

    if (stats.length > 0) {
        await Tour.findByIdAndUpdate(tourId, {
            AverageRating: stats[0].avgRating,
            NumberofReviews: stats[0].nRating
        });
    } else {
        await Tour.findByIdAndUpdate(tourId, {
            AverageRating: 4.5,
            NumberofReviews: 0
        });
    }
}

reviewSchema.post('save', function() {
    this.constructor.calcAverageRatings(this.Tour);
  
});

reviewSchema.pre(/^findOneAnd/, async function(next) {
    this.review = await this.model.findOne(this.getQuery());
    next();
});

reviewSchema.post(/^findOneAnd/, async function() {
    if (this.review) {
        await this.review.constructor.calcAverageRatings(this.review.Tour);
    }
    
});

const Review = mongoose.model("reviews", reviewSchema);

module.exports = Review;
