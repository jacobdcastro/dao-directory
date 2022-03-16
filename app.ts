import express from 'express';
const app = express();
import cors from 'cors';
require('dotenv').config();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// app.use(require("./routes/record"));

// get mongo driver connection
import db from './config/db';

app.listen(port, () => {
  // perform a database connection when server starts
  db.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
