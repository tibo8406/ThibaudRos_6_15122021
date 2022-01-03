const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const sauceCtrl = require('../controllers/sauce');
const multer = require('../middlewares/multer-config');

router.get('/', sauceCtrl.showAllSauces);
router.post('/', isLoggedIn, multer, sauceCtrl.createSauce);
router.get('/:id', sauceCtrl.showOneSauce);
router.put('/:id', isLoggedIn, sauceCtrl.modifySauce);
router.delete('/:id', isLoggedIn, sauceCtrl.deleteOneSauce);


module.exports = router;