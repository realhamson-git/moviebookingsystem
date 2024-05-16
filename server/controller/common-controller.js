// const Payment = require('../Payment')
const { encrypt_password, jwt_sign, compare_password } = require('../helper')
const { MovieModel, UserModel, ShowModel, BookingModel } = require('../models/index')
const ObjectId = require('mongoose').Types.ObjectId


module.exports.getAllMovies = async ( { query }, res ) => {
    let filter  = {}

    if (query.search) {
        filter = {
            $or: [
                {
                    title: {
                        $regex: query.search.trim(),
                        $options: 'i'
                    }
                },
                {
                    genres: {
                        $regex: query.search.trim(),
                        $options: 'i'
                    }
                },
                {
                    cast: {
                        $regex: query.search.trim(),
                        $options: 'i'
                    }
                },
            ]
        }
    }

    const movies = await MovieModel.find(filter)
    return res.status(200).json({ movies })
}

module.exports.createUser = async ({ body }, res ) => {
    const duplicateUser = await UserModel.findOne({ email: body.email })
    if( duplicateUser ) return res.status(500).json({ message: "User Already created!"})

    const encryptedPassword = await encrypt_password( body.password )
    let user = await UserModel.create({ ...body, password: encryptedPassword })

    const token = jwt_sign( user._id )

    user = JSON.parse(JSON.stringify( user ))
    delete user.password 

    return res.status(200).json({ user, token })
}

module.exports.login = async ({ body }, res ) => {
    let user = await UserModel.findOne({ email: body.email }, { password: 1, email: 1, name: 1 })
    if( !user ) return res.status(401).json({ message: "User Not Registered" })

    const isAuthenticated = await compare_password( body.password, user.password ) 
    if( !isAuthenticated ) return res.status(401).json({ message: "Incorrect Password"})
    
    const token = jwt_sign( user._id )

    user = JSON.parse(JSON.stringify( user ))
    delete user.password

    return res.status(200).json({ isAuthenticated: true, user, token })
}

module.exports.getShows = async ({ },  res ) => {
    const shows = await ShowModel.aggregate([
        {
            $group: {
                _id: "$movieID",
                show: {
                    $push: {
                        timing: 1
                    }
                }
            }
        },
        {
            $lookup: {
                from: "movies",
                localField: "_id",
                foreignField: "_id",
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
        }
    ])
   
    return res.status(200).json({ shows })
}

module.exports.getAllShows = async ({ },  res ) => {
    const shows = await ShowModel.aggregate([

        {
            $lookup: {
                from: "movies",
                localField: "movieID",
                foreignField: "_id",
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
        }
    ])
   
    return res.status(200).json({ shows })
}

module.exports.getMovieShow = async ({ params },  res ) => {
    const shows = await ShowModel.find({ movieID: new ObjectId( params.showID ) }).populate('movieID', 'title thumbnail')
    return res.status(200).json({ shows })
}

module.exports.getShowDetails = async ({ params },  res ) => {
    const show = await ShowModel.findOne({ _id: new ObjectId( params.showID ) }).populate('movieID', 'title thumbnail')
    return res.status(200).json({ show })
}

module.exports.getSeatsInShow = async ({ params }, res ) => {
    const seats = await BookingModel.find({ showID: new ObjectId( params.showID ) }, { seats: 1 })
    return res.status(200).json({ seats })
}

module.exports.bookMovie = async ({ body }, res ) => {
    let txnId = new Date().getTime()

    const show = await ShowModel.findOne({ _id: new ObjectId( body.showID )}, { movieID: 1 })
    await BookingModel.create({ ...body, isPaid: true, movieID: new ObjectId( show.movieID ), txnId })

    // let payment =  new Payment( txnId, body.userID,  100 ) 
    // let paymentData = await payment.create_payment( )
    // console.log('paymentData', paymentData)
    // const redirectUrl = paymentData?.data?.instrumentResponse?.redirectInfo?.url

    return res.status(201).json({ message: "Movie booked successfully", isBooked: true })
}