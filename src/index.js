const express = require('express');
const morgan = require('morgan');
const routes = require('./routes/index.routes');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const path = require('path');
const https = require("https");
const fs = require("fs");
require('dotenv').config({path:__dirname+'/./../.env'});
const auth = require('./config/auth/auth');
const ssl = require('./utils/ssl');
const excel4node = require("excel4node");
const multer = require('multer');

var corsOptions = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 200
}

// const cert = ssl.certs("rh");
// const key = ssl.keys(cert);

// const options = {
//   key: fs.readFileSync(
//     __dirname +
//       "/../../../ssl/keys/" + key
//   ),
//   cert: fs.readFileSync(
//     __dirname +
//       "/../../../ssl/certs/" + cert
//   ),
// };

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));
app.use(routes);

const PORT = process.env.PORT || 24000;

app.use('/pdf', auth.isAuthenticatedAdmin, express.static(path.join(__dirname, '..', 'uploads/calendario_doacao.pdf')));
app.use('/doadores', auth.isAuthenticatedAdmin, express.static(path.join(__dirname, '..', 'uploads/doadores.xlsx')));


// https.createServer(options, app).listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.listen(PORT, () => {
  console.log(`server running port: ${PORT}`);
});