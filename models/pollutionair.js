// Récuperation des plugin et models nécessaire
const mongoose = require('mongoose');

// Le schema de la table de pollutionair de la base de donnée 
const pollutionairSchema = mongoose.Schema({
    time: { type: String, required: true },
    aqi: { type: Number, required: true },

});

module.exports = mongoose.model('pollutionair', pollutionairSchema);