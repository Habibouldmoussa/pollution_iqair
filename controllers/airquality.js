// Récuperation des plugin et models nécessaire
const dotenv = require("dotenv");
const fetch = require("node-fetch");
dotenv.config();
const API_KEY = process.env.APP_KEY;
const Pollutionair = require('../models/pollutionair');
/* On affiche la qualitée de l'air par latitude et la longitude
*@param { object HTTP  } req
*@param { object HTTP } res 
*@param { String } next
*@property { Number } latit - latitude
*@property { Number } longit - longitude
*@property { String } API_KEY - token de l'aplication  
*@return { JSON } pollutionair - résultat de la requête
*/
exports.getQualityAir = async (req, res, next) => {
    const { latit, longit } = req.query;
    try {
        const data = await fetch(
            `http://api.airvisual.com/v2/nearest_city?lat=${latit}&lon=${longit}&key=${API_KEY}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );
        const jsonData = await data.json();
        const results = jsonData.data.current.pollution
        return res.json({ Result: { Pollution: results } })
    }
    catch (err) {
        console.log(err);
    }
};
/* On affiche la pollution la plus élever 
*@param { object HTTP  } req
*@param { object HTTP } res 
*@param { String } next
*@return { JSON } pollutionair
*/
exports.getWorstQualityAir = (req, res, next) => {
    Pollutionair.findOne().sort({ aqi: -1 })
        .then(pollutionair => res.status(200).json(pollutionair))
        .catch(error => res.status(404).json({ error: error }));
};