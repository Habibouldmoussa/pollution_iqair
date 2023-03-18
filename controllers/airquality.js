const dotenv = require("dotenv");
const fetch = require("node-fetch");
dotenv.config();
const API_KEY = process.env.APP_KEY
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
