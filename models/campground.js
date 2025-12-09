const mongoose = require('mongoose');
const review = require('./review');
const { ref, types } = require('joi');
const Schema = mongoose.Schema;

const imagesSchema = new Schema({
    url: String,
    filename: String
});

imagesSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
}
);

const opts = { toJSON: { virtuals: true } };

const campgroundSchema = new Schema({
    title: String,
    images: [imagesSchema],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, opts);


campgroundSchema.virtual('properties.popUpMarkup').get(function () {
    return `<strong><a href='/campgrounds/${this._id}</strong>'>${this.title}</a>`;
})

campgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }

})

module.exports = mongoose.model('Campground', campgroundSchema);
