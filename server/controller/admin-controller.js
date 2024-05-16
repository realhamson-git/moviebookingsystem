const { UserModel, ShowModel, BookingModel, MovieModel } = require('../models/index')
const ObjectId = require('mongoose').Types.ObjectId

module.exports.getAllUsers = async ( {}, res ) => {
    // const movies = await MovieModel.find({ type: "user" })
    const users = await UserModel.find({}, { name: 1, email: 1, _id: 1 })
    return res.status(200).json({ users })
}


module.exports.createShow = async ({ body, params }, res ) => {
    
    if( !body.name ){
        const counts = await ShowModel.countDocuments({ movieID: new ObjectId( params.id ) })
        body.name = `Show ${+counts + 1}`
    }

    await ShowModel.create({ ...body, movieID: new ObjectId( params.id ) })
    return res.status(201).json({ message: "Show created"})
}


module.exports.getAllBookings = async ({}, res ) => {
    const bookings = await BookingModel.aggregate([
        {
            $lookup: {
                from: 'shows',
                localField: 'showID',
                foreignField: '_id',
                as: 'show',
                pipeline: [
                    {
                        $project: {
                            movieID: 1,
                            name: 1,
                            timing: 1
                        }
                    }
                ]
            }
        },
        {
            $unwind: {
                path: '$show',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'userID',
                foreignField: '_id',
                as: "user",
                pipeline: [
                    {
                        $project: {
                            name: 1
                        }
                    }
                ]
            }
        },
        {
            $unwind: {
                path: '$user',
                preserveNullAndEmptyArrays: true
            }
        },

        {
            $lookup: {
                from: 'movies',
                localField: 'movieID',
                foreignField: '_id',
                as: "movie",
                pipeline: [
                    {
                        $project: {
                            title: 1,
                            thumbnail: 1
                        }
                    }
                ]
            }
        },
        {
            $unwind: {
                path: '$movie',
                preserveNullAndEmptyArrays: true
            }
        },


        {
            $sort: {
                createdAt: -1
            }
        },
        {
            $project: {
                user: 1,
                show: 1,
                seats: 1,
                movie: 1
            }
        }
    ])

    return res.status(200).json({ bookings })
} 

module.exports.deleteUser = async ({ params }, res ) => {
    await UserModel.deleteOne({ _id: new ObjectId( params.userID )})
    return res.status(200).json({ message: "User Deleted" })
}

module.exports.deleteMovie = async ({ params }, res ) => {
    await MovieModel.deleteOne({ _id: new ObjectId( params.movieID )})
    return res.status(200).json({ message: "User Deleted" })
}

module.exports.deleteShow = async ({ params }, res ) => {
    await ShowModel.deleteOne({ _id: new ObjectId( params.showID ) })
    return res.status(200).json({ message: "Show Deleted" })
}

module.exports.editUser = async ({ body }, res ) => {
    await UserModel.updateOne({ _id: new ObjectId( body._id ) }, body )
    return res.status(200).json({ message: "User Updated" })
}

module.exports.editMovie = async ({ params, body }, res ) => {
    await MovieModel.updateOne({ _id: new ObjectId( params.movieID ) }, body )
    return res.status(200).json({ message: "Movie Updated" })
}