const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const CatchAsync = require('../Utils/CatchAsync');
const { isloggedin, isAuthor, validateCampground } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });


router.route('/')
    .get(CatchAsync(campgrounds.index))
    .post(isloggedin, upload.array('image'), validateCampground, CatchAsync(campgrounds.createCampground));

router.get('/new', isloggedin, (campgrounds.renderNewform));

router.route('/:id')
    .get(CatchAsync(campgrounds.showCampground))
    .put(isloggedin, isAuthor, upload.array('image'), validateCampground, CatchAsync(campgrounds.updateCampground))
    .delete(isloggedin, isAuthor, CatchAsync(campgrounds.deleteCampground))

router.get('/:id/edit', isloggedin, isAuthor, CatchAsync(campgrounds.editCampgrounds));

module.exports = router;