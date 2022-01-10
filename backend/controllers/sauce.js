const Sauce = require('../models/Sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
        ...sauceObject,
        userId: req.token.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce enregistrée !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? JSON.parse(req.body.sauce) : req.body;
    if (req.file) {
        sauceObject.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        const filename = req.sauce.imageUrl.split('/images')[1];
        fs.unlink(`images/${filename}`, () => {});
    } else {
        sauceObject.imageUrl = req.sauce.imageUrl;
    }
    Sauce.updateOne({ _id: req.params.id }, {
            ...sauceObject,
            userId: req.token.userId,
            _id: req.params.id
        })
        .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
        .catch(error => res.status(400).json({ error }));
};
exports.deleteOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

exports.showOneSauce = (req, res, next) => {

    res.status(200).json(req.sauce)

};
exports.showAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};
exports.likeSauce = (req, res, next) => {
    const sauce = req.sauce;
    if (req.body.like === 1) {
        if (sauce.usersLiked.includes(req.token.userId)) {
            return res.status(403).json({ message: 'Vous ne pouves pas liker deux fois la même sauce ;)' })
        }
        if (sauce.usersDisliked.includes(req.token.userId)) {
            let index = sauce.usersDisliked.indexOf(req.body.userId);
            sauce.usersDisliked.splice(index, 1);
        }
        sauce.usersLiked.push(req.token.userId);
    }

    if (req.body.like === -1) {
        if (sauce.usersDisliked.includes(req.token.userId)) {
            return res.status(403).json({ message: 'Vous ne pouves pas disliker deux fois la même sauce ;)' })
        }
        if (sauce.usersLiked.includes(req.token.userId)) {
            let index = sauce.usersLiked.indexOf(req.token.userId);
            sauce.usersLiked.splice(index, 1);
        }

        sauce.usersDisliked.push(req.token.userId);

    }
    if (req.body.like === 0) {
        if (sauce.usersDisliked.includes(req.token.userId)) {
            let index = sauce.usersDisliked.indexOf(req.body.userId);
            sauce.usersDisliked.splice(index, 1);
        } else if (sauce.usersLiked.includes(req.token.userId)) {
            let index = sauce.usersLiked.indexOf(req.token.userId);
            sauce.usersLiked.splice(index, 1);
        }
    }
    sauce.likes = sauce.usersLiked.length;
    sauce.dislikes = sauce.usersDisliked.length;
    sauce.save()
        .then(() => res.status(201).json({ message: "success" }))
        .catch(error => res.status(400).json({ error }));
};