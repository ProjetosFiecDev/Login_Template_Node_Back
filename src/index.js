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

var corsOptions = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 200
}

// const options = {
//   key: fs.readFileSync(
//     __dirname +
//       "/../../../ssl/keys/bdcf2_bb601_809707343dcca0bf6224e2cb86eebbae.key"
//   ),
//   cert: fs.readFileSync(
//     __dirname +
//       "/../../../ssl/certs/doacaosangue_fiecdev_com_br_bdcf2_bb601_1640908799_d7972ba2e5e8ca85524d99d11b3b8b7b.crt"
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