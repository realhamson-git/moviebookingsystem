import { useEffect, useState } from "react"
import { useMovieContext } from "../../Context/MovieContext"
import { userRequest } from "../../Components/request"
import { useForm } from "react-hook-form"

export default () => {
    const { register, handleSubmit, reset } = useForm({ onChange: true })

    const [ context, setContext ] = useMovieContext()
    const [ bookings, setBookings ] = useState([])


    useEffect(() => {
        getBookings()
        reset( context.user )
    }, [])

    const getBookings = async () => {
        try {
            const { data } = await userRequest.get('/bookings')
            setBookings( data.bookings )
        } catch (error) {
            console.log(error)
        }
    }

    const editProfile = async ( values ) => {
        try {

            let user = { 
                ...context.user, 
                name: values.name,
                email: values.email 
            }

            await userRequest.post('/user', values )
            
            localStorage.setItem('user', JSON.stringify( user ))
            setContext(  prev => ({ ...prev, user }) )
        } catch (error) {
            console.log( error )
        }
    }

    return(
        <section className="container">
            <h1 className="p-3">Welcome { context.user?.name }, </h1>

            <section className="row my-2">
                <div className="col-md-4 col-sm-12 p-3">
                    <div className="bg-blue-dark rounded py-2">
                        <h4 className="p-3">Bookings</h4>
                        {
                            bookings?.map(( booking, i ) => 
                                <div className='d-flex justify-content-between align-items-center px-3 py-2 bg-blue-light'>
                                    <div className='d-flex align-items-center' >
                                        <div style={{ width: "50px", height: "50px" }}>
                                            <img src={booking.movie?.thumbnail} width={'100%'} height={'100%'} className='image-cover rounded' />
                                        </div>
                                        <h6 className='ms-2 mb-0' style={{ width: '6rem' }}>{booking.movie?.title}</h6>
                                    </div>
                                    <div className="">
                                        <h6 className='mb-0'>{ booking.show?.name }</h6>
                                        <p className='mb-0'>{ booking.show?.timing?.start } - { booking.show?.timing?.end }</p>
                                    </div>
                                </div>
                            )
                        }

                    </div>
                </div>
                
                <div className="col-md-6 col-sm-12 p-3">
                    <h4 >Edit Profile</h4>
                    <form onSubmit={handleSubmit( editProfile )}>
                        <div className="my-3">
                            <div>
                                <label>Name</label>
                                <div className="w-100 bg-blue-dark my-2">
                                    <input className="search-input p-3 w-100" placeholder="Enter Name" {...register('name')} required={true} />
                                </div>
                            </div>
                        </div>

                        <div className="my-3">
                            <div>
                                <label>Email Address</label>
                                <div className="w-100 bg-blue-dark my-2">
                                    <input className="search-input p-3 w-100" placeholder="Enter Email Address" {...register('email')} required={true} />
                                </div>
                            </div>
                        </div>

                        <div className="my-3">
                            <div>
                                <label>New Password</label>
                                <div className="w-100 bg-blue-dark my-2">
                                    <input type="password" className="search-input p-3 w-100" placeholder="Enter New Password" {...register('password')} required={true} />
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="bg-light w-100 p-3 text-dark mt-4 text-center cursor-pointer">
                            Edit Profile
                        </button>
                    </form>
                </div>
            </section>
        </section>
    )
} 