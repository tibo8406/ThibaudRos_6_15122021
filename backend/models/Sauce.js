const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({

    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
});

module.exports = mongoose.model('Sauce', sauceSchema);