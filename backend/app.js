const express = require('express'); //creation app express
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://tibo8406:<password>@cluster0.whmlg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res) => {
    res.json({ message: 'requete recu' })
});
module.exports = app;