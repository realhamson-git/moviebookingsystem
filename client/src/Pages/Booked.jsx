import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { request } from "../Components/request"
import { useMovieContext } from "../Context/MovieContext"

export default () => {
    const { state } = useLocation()
    const navigate = useNavigate()

    const [context] = useMovieContext()
    const [showDetails, setShowDetails] = useState({})

    useEffect(() => {
        getShowDetails()
    }, [])

    const getShowDetails = async () => {
        try {
            const { data } = await request.get(`/show-details/${state.showID}`)
            setShowDetails(data.show)
        } catch (error) { console.log(error.response?.data?.message) }
    }

    const booked = async () => {
        try {
            const value = { ...state, userID: context.user?._id }
            const { data } = await request.post('/booked', value)

            if (data.isBooked) {
                navigate('/dashboard')
            }
        } catch (error) {

        }
    }

    return (
        <section className="container p-5">
            <div className="row">
                <div className="col-md-4 col-sm-12">
                    <div className="detail-poster mb-3">
                        <img src={showDetails.movieID?.thumbnail} width={'100%'} height={'100%'} className="image-cover rounded" />
                    </div>
                </div>

                <div className="col-md-6 col-sm-12 p-5">
                    <h1 >{showDetails.movieID?.title}</h1>

                    <h4 className="my-4">Show Details</h4>
                    <h6> Show : <span className="text-info ms-3">  {showDetails.name} </span></h6>
                    <h6> Timing : <span className="text-info ms-3">  {showDetails.timing?.start} - {showDetails.timing?.end} </span></h6>

                    <h4 className="my-4">Seats</h4>
                    <h6 className="text-info">
                        {
                            String(state.seats)
                        }
                    </h6>


                    <div className='d-flex mt-5'>
                        <Link to={'/'} className='bg-blue-dark detail-button p-2 text-center mb-5 cursor-pointer ' ><h4 className='mb-0'>Cancel</h4></Link>
                        <div className='bg-light detail-button p-2 text-center mb-5 text-dark mx-3 cursor-pointer' onClick={() => booked()} ><h4 className='mb-0'>Confirm</h4></div>
                    </div>


                </div>
            </div>
        </section>
    )
}