// Database Connection
require('./db');
require('dotenv/config')

const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');

const ViewRoutes = require('./middleware/morgan')
const routes = require('./routes/index')

const app  = express();
const PORT = 5000

app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

app.use( cors({ origin: "*" }) )
// app.use(express.json());


// Routes
app.use('/api', ViewRoutes, routes );

app.listen( PORT , () => console.log(`Server Start on port ${ PORT }`))

