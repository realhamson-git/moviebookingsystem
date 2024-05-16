const { encrypt_password } = require("../helper")
const { BookingModel, UserModel } = require("../models")
const ObjectId = require('mongoose').Types.ObjectId

module.exports.userDetails = async ({ body, params }, res ) => {
    res.status(200).json({ message: "Its Work" })
}

module.exports.editProfile = async ({ user, body }, res) => {
    delete body._id 

    if( body.password ){
        body.password = await encrypt_password( body.password )
    }

    await UserModel.updateOne({ _id: new ObjectId( user._id )  }, body )
    return res.status(200).json({ message: "Updated successfully" })
}

module.exports.getBookings = async ({ user }, res ) => {
    console.log('>>>>')
    const bookings = await BookingModel.aggregate([
        {
            $match: {
                userID: new ObjectId( user?._id )
            }
        },
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