const { mongoose } = require('mongoose')
const DATABASE_URL = "mongodb://localhost:27017/mvbooking"

//  Data Base Connection
mongoose.connect( DATABASE_URL );

const database = mongoose.connection
database.on('error', (error) => console.log(error) )
database.once('connected', () => console.log('Database Connected - mvbooking') )