const express = require('express');
const router = express.Router();
const { isLoggedIn, isOwner } = require('../middlewares/auth');
const sauceCtrl = require('../controllers/sauce');
const multer = require('../middlewares/multer-config');

router.get('/', sauceCtrl.showAllSauces);
router.post('/', multer, sauceCtrl.createSauce);
router.get('/:id', sauceCtrl.showOneSauce);
router.put('/:id', isOwner, multer, sauceCtrl.modifySauce);
router.delete('/:id', isOwner, sauceCtrl.deleteOneSauce);


module.exports = router;