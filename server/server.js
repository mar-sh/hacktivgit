const cors = require('cors');
const express = require('express');
const lusca = require('lusca');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();
const dbURL = process.env.ATLAS_URI || `mongodb://localhost:27017/${process.env.MONGODB_DB}`;
const port = process.env.PORT || 3000;

const mainRoute = require('./routes/web');

mongoose.connect(dbURL, { useNewUrlParser: true });
mongoose.connection.on('error', (error) => {
  console.log(error);
  console.log('Please make sure MongoDB is running');
process.exit();
})

app.disable('x-powered-by');

app.use(cors());
app.use(lusca.xframe('DENY'));
app.use(lusca.xssProtection(true));
app.use(lusca.nosniff(true));
app.use(lusca.referrerPolicy('origin'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use('/', mainRoute);

app.listen(port, () => {
  console.log('Server is running on port: ', port);
});
