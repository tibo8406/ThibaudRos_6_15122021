const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controllers/sauce');

router.get('/api/sauces/:id', sauceCtrl.showOneSauce);
router.put('/api/sauces/:id', sauceCtrl.modifySauce);

router.delete('/api/sauces/:id', sauceCtrl.deleteOneSauce);

router.get('/api/sauces', sauceCtrl.showAllSauces);

router.post('/api/sauces', sauceCtrl.createSauce);

module.exports = router;