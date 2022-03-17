import express from 'express';
const app = express();
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
require('dotenv').config();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.use('/api/user', require('./routes/api/user'));
app.use('/api/orgs', require('./routes/api/orgs'));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

// get mongo driver connection
import db from './config/db';

app.listen(port, () => {
  // perform a database connection when server starts
  db.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
