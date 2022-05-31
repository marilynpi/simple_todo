const express = require('express');
const morgan = require('morgan'); // shows http methods in console
const cors = require('cors'); // needed to enable cors
const https = require('https');
const fs = require('fs');

const routes = require('./routes/tasks.routes');

const app = express();
const port = 4000;

const privateKey = fs.readFileSync('/etc/letsencrypt/live/tierracristal.ar/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/tierracristal.ar/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/tierracristal.ar/chain.pem', 'utf8');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json()); //needed to express read json objects
app.use(routes);

app.use((err, req, res, next) => {
    return res.json({
        message: err.message
    })
})

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};
const httpsServer = https.createServer(credentials, app);

//app.listen(port);

httpsServer.listen(port);
console.log('Server on port ' + port );
