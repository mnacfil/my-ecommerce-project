const mongoose = require('mongoose');

const productDetailSchema = new mongoose.Schema({
    description: {
        type: String,
        default: 'No description'
    },
    benefits: Array,
    detail: Array
})

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name of product'],
        minLength: [3, 'Name must be not less than 3 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please provide product price'],
    },
    gender: {
        type: String,
        enum: {
            values: ['men', 'women', 'unisex'],
            message: '{VALUE} is not supported'
        },
        default: 'men'
    },
    size: {
        type: String,
        required: [true, `What's the size?`],
        enum: {
            values: ['3.5', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13', '14', '15', '16', '17', '18'],
            message: '{VALUE} is not supported'
        },
    },
    overview: productDetailSchema,
    freeShipping: {
        type: Boolean,
        default: false
    },
    stock: {
        type: Number,
        required: [true, 'Please provide stock of this product'],
        default: 0,
    },
    ratings: {
        type: Number,
        default: 0
    },
    reviews: {
        type: Number,
        default: 0
    },
    user: {
        ref: 'User',
        type: mongoose.Types.ObjectId,
        required: true
    }
},
{
    timestamps: true, toJSON: { virtuals: true}, toObject: {virtuals: true}
}
);

// remove the reviews associated with product, if product is deleted
// ProductSchema.pre('remove', async function() {
//     await this.model('Review').deleteMany({ product: this._id })
// })

module.exports = mongoose.model('Product', ProductSchema);