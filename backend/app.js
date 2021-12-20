const express = require('express'); //creation app express
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

mongoose.connect('mongodb+srv://tibo8406:55948484Tt&@cluster0.whmlg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use('/api/sauces', (req, res, next) => {
    const sauce = {
        userId: 'indentifiant mongodb',
        name: 'nom de la sauce',
        manufacturer: 'Mon premier fabricant de la sauce',
        description: 'Les infos de mon premier sauce',
        mainPepper: 'piment principal',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        heat: 10,
        likes: 4900,
        dislikes: 2,
        usersLiked: ["<userId>"],
        usersDisliked: ["<userId>"],
    };
    res.status(200).json(sauce);
});

app.use('/api/auth', userRoutes);
//app.use('/api/sauces', sauceRoutes);
module.exports = app;