
require('dotenv').config();
require('colors');
const express = require('express');
const connectDB = require('./config/db');
const morgan = require('morgan');

const app = express();
connectDB();

app.use(express.json());
app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`.green.bold);
});

app.use(morgan('dev'));

app.use('/api/parking', require('./routes/parkingRoutes'));


app.get('/', (req, res) => {
    res.send('Smart Parking API Running...');
});
