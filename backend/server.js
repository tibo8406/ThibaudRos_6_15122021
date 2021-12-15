const http = require('http');
const app = require('./app'); //importation app

app.set('port', process.env.PORT || 3000) // on sert le port de fonctionnement 

const server = http.createServer(app);
server.listen(process.env.PORT || 3000);
console.log("Le serveur est lancé ");