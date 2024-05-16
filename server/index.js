// Database Connection
require('./db');
require('dotenv/config')

const express = require('express');
const cors = require('cors');
const ViewRoutes = require('./middleware/morgan')

const routes = require('./routes/index')
// const bodyParser = require('body-parser');

const app  = express();
const PORT = 5000

app.use( cors({ origin: "*" }) )
app.use(express.json());


// app.use( bodyParser() )

// Routes
app.use('/api', ViewRoutes, routes );

app.listen( PORT , () => console.log(`Server Start on port ${ PORT }`))

