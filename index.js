const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { dbConnection } = require('./database/config')

const app = express();
//cors
app.use(cors());
//read and parse body

app.use(express.json());

// use static dir 
app.use(express.static('public'));

// data base
dbConnection();

//Routes 

app.use('/api/users', require('./routes/users.route'));
app.use('/api/hospitals', require('./routes/hospitals.route'));
app.use('/api/doctors', require('./routes/doctors.route'));
app.use('/api/login', require('./routes/auth.route'));

app.use('/api/all', require('./routes/searchingAll.route'));
//TODO: valations error must be checked
app.use('/api/upload', require('./routes/uploads.route'));


app.listen(process.env.PORT, () => { console.log (' server is running on '+ process.env.PORT) });