const express = require('express');
const router = express.Router({ mergeParams: true });
const Campground = require('../models/campground');
const { validateReview, isloggedin, isReviewAuthor } = require('../middleware');
const Review = require('../models/review');
const CatchAsync = require('../Utils/CatchAsync');
// const ExpressError = require('../Utils/ExpressError');
const reviews = require('../controllers/reviews');

router.post('/', isloggedin, validateReview, CatchAsync(reviews.newReview));

router.delete('/:reviewId', isloggedin, isReviewAuthor, CatchAsync(reviews.deleteReview));

module.exports = router;