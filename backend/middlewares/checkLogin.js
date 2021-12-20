exports.checkLoginPassword = (req, res, next) => {
    //checck mail et password
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })

    .catch(error => res.status(500).json({ error }));
    // si on ext

    //si pas ok status 400
    staus 400
};