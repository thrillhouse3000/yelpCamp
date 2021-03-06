const mongoose = require('mongoose');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '60c2b85d934641692c0ceca1',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod dicta excepturi laboriosam? Officiis itaque neque inventore aliquam excepturi doloribus omnis alias, nesciunt, vel incidunt dolorem rerum quibusdam quod ut assumenda.',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dtxjwf2xw/image/upload/v1627515572/YelpCamp/lqogtdlookolzwwnuaeo.jpg',
                    filename: 'YelpCamp/lqogtdlookolzwwnuaeo'
                },
                {
                    url: 'https://res.cloudinary.com/dtxjwf2xw/image/upload/v1627515574/YelpCamp/onooxqmokkzioyrq0yj2.jpg',
                    filename: 'YelpCamp/onooxqmokkzioyrq0yj2'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})