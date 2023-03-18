# pollution_iqair

## Authors

- [@OULDMOUSSA HABIB](https://ouldmoussahabib.com)

## Deployment

Lien local :

```
http://localhost:3000/
```

## API Reference

- Endpoint Niveau de pollution par latitude et longitude

```
 Get : /airQuality/{?latit,longit}
```

- Endpoint Le pire niveau de pollution enregistré sur paris

```
 Get : /airQuality/worstqualityair
```

## Documentation

je vous invite sur apiary par mail pour la documentation

## Run Locally

Clone the project

```bash
  git clone https://github.com/Habibouldmoussa/pollution_iqair.git
```

Go to the project directory

```bash
  cd pollution_iqair
```

Install dependencies

```bash
  npm install
```

Create .env file

```bash
echo -e "PORT=3000 \n APP_KEY='your_secret_key' \n MONGODB_URL='your_url_mongodb_with_auth' " > .env
```

Start the server

```bash
  npm run start
```
