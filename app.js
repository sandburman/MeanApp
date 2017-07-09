const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
   console.log('Connected to database ' + config.database);
});

mongoose.connection.on('error', (err) => {
   console.log('Error connecting to database ' + err);
});

const app = express();

const users = require('./routes/users')

const port = 80;

// Use Cors middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body-Parser middleware
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

// Index Route
app.get('/', (req, res) => {
    res.send('Invalid Enpoint');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'public/index.html'));
});
// Start Server
app.listen(port, () => {
    console.log('Server Started on port ' + port);
});
