require('./db');

const { MovieModel, UserModel } = require('./models');
const MovieData = require('./data/movies-data');

const initialize = async () => {

    console.log('Initialize...')

    // Movies Setup
    const movies = await MovieModel.countDocuments()

    if( !movies ) {
        await MovieModel.insertMany( MovieData )
    }

    // Admin Setup
    const admin = await UserModel.findOne({ email: "demo@gmail.com" })

    if( !admin ){
        await UserModel.create({ 
            name: "Admin",
            email: "demo@admin.com",
            password: "$2b$10$5VSMP8HY0Sc8uLzaCAwS1e7sNO/bb.J9yZvjsFM6/KKeeaGU25pSe" 
        })
    }

    console.log('Complete Setup..')
}

initialize()