const mongoose = require('mongoose');
const { places, descriptors } = require('./seedhelpers');
const campground = require('../models/campground');
const cities = require('./cities');


mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await campground.deleteMany({});
    for (let i = 0; i <= 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new campground({
            //my user id
            author: '68f094d10a0c7cf5bf44c96e',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/duttnnzsv/image/upload/v1762682707/YelpCamp/qjddh6htu1uz39dpg8ot.webp',
                    filename: 'YelpCamp/qjddh6htu1uz39dpg8ot'
                },
                {
                    url: 'https://res.cloudinary.com/duttnnzsv/image/upload/v1762682707/YelpCamp/rfyufvlayndalxicjhrr.jpg',
                    filename: 'YelpCamp/rfyufvlayndalxicjhrr'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});