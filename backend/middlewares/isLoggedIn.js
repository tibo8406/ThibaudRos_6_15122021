const jwt = require('jsonwebtoken');

exports.isLoggedIn = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // supprime le premier element
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const userId = decodedToken.userId;
        req.auth = { userId };
        if (req.body.userId && req.body.userId != userId) {
            throw 'User ID non valable !';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | 'Requete non autorisée' });
    }
}