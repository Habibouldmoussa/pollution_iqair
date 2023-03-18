// Importation des routes, middleware, controllers et des plugin nécessaire 
const express = require('express');
const router = express.Router();
const airqualityCtrl = require('../controllers/airquality');

// On apprlique les méthodes et les middlewares necessaire et les controlleurs pour chaque routes  
router.get('/', airqualityCtrl.getQualityAir);
router.get('/worstqualityair', airqualityCtrl.getWorstQualityAir);

module.exports = router;