// Récuperation des plugin et models nécessaire
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cron = require('node-cron');
const fetch = require("node-fetch");
const Pollutionair = require('./models/pollutionair');
/* Récuperation du token dans les variable d'environement  
* le fichier d'environement .env doit contenir : 
* PORT = 3000
* MONGODB_URL = "lien de connexion à votre base de donnée"
* APP_KEY="Votre API token "
*/
const dotenv = require("dotenv");
const rateLimit = require('./models/limitrate');
dotenv.config();
const path = require('path');
const airqualityRoutes = require('./routes/airquality');
// Url de la base de donnée 
const MY_MONGODBURL = process.env.MONGODB_URL;
//-------------------------------------------
// Connexion à la base de donnée
mongoose.set('strictQuery', true);
mongoose.connect(MY_MONGODBURL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
// ajouter les differants plugins à notre application express 
app.use(express.json());
app.use(rateLimit);
// on configure quelques regle de cross control  
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000/");
    // on indique que les ressources peuvent être partagées depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Origin', '*');
    // on indique les entêtes qui seront utilisées après la pré-vérification cross-origin afin de donner l'autorisation
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // on indique les méthodes autorisées pour les requêtes HTTP
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
// Création des routes 
const NB_SECOND = process.env.NB_SECOND;
app.use('/airquality', airqualityRoutes);
cron.schedule(NB_SECOND + '* * * *', async () => {
    const API_KEY = process.env.APP_KEY
    const longit = 2.352222;
    const latit = 48.856613;
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
        const aqius = jsonData.data.current.pollution.aqius
        const ts = jsonData.data.current.pollution.ts
        const pollutionair = new Pollutionair({
            time: ts,
            aqi: aqius
        });
        pollutionair.save()
            .then(() => { console.log("pollution air enregistré !"); })
            .catch((error) => { console.log(error) })
        console.log(aqius + ts);
    }
    catch (err) {
        console.log(err);
    }
});
module.exports = app;