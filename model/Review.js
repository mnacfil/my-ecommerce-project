const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'Please provide rating']
    },
    message: {
        type: String,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true
    },
},{
    timestamps: true
})

// Restrict the user to review one product only
ReviewSchema.index({ user: 1, product: 1}, { unique: true});

// dynamically calculate the average rating based on number of reviews
ReviewSchema.statics.calculateAverageRating = async function(id) {
    try {
        const result = await this.aggregate([
            { $match: {product: id} },
            {
                $group: {
                    _id: null,
                    ratings: { $avg: '$rating'},
                    reviews: { $sum: 1}
                }
            }
        ]);
        console.log(result)
        // Sync the product associated with id,
        await this.model('Product').findOneAndUpdate(
            { _id: id},
            {
                ratings: result[0].ratings.toFixed(1) || 0,
                reviews: result[0].reviews || 0
            }
        )
    } catch (error) {
        console.log(error);
    }
}

// everytime the review created/save(after) or delete, calculate the average rating
ReviewSchema.post('save', async function(){
        await this.constructor.calculateAverageRating(this.product)
    }
);

ReviewSchema.post('remove', async function(){
        await this.constructor.calculateAverageRating(this.product)
    }
);

module.exports = mongoose.model('Review', ReviewSchema);