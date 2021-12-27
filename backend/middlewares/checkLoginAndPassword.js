exports.checkLoginAndPassword = (req, res, next) => {
    //checck mail et password
    if (req.body.email && req.body.password) {
        next();
    } else {
        res.status(400).json({ message: "Veuillez remplir l'email et le mot de passe" });
    }
};