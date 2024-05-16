import { useEffect, useState } from 'react';
import { useMovieContext } from '../../Context/MovieContext';
import Table from '../../Components/Table';
import { adminRequest, request } from '../../Components/request'
import { Link } from 'react-router-dom';

export default () => {
    const [ context, setContext ] = useMovieContext()
    const [ users, setUsers ] = useState([])
    const [ shows, setShows ] = useState([])
    const [ bookings, setBookings ] = useState([])

    useEffect(() => {
        getAllUsers()
        getShows()
        getBookings()

        if( !context.movies.length ){
            getAllMovies()
        }
    }, [])

    const getAllMovies = async () => {
        try{
            const { data } = await request.get('/movies')
            setContext( prev => ({ ...prev, movies: data.movies }))
        } catch(error){}
    }


    const getAllUsers = async () => {
        try{
            const { data } = await adminRequest.get('/users')
            setUsers( data.users )
        }catch(error){ console.log(error) }
    }

    const getShows = async () => {
        try{
            const { data } = await request.get('/all-shows')
            setShows( data.shows )
        }catch(error){ console.log(error) }
    }

    const getBookings = async () => {
        try {
            const { data } = await adminRequest.get('/bookings')
            setBookings( data.bookings )
        } catch (error) {
            console.log(error)
        }
    }

    const deleteUser = async ( _id ) => {
        try {
            await adminRequest.delete(`/user/${ _id }`)
            setUsers( prev => 
                prev.filter( user => user._id !== _id )
            )
        } catch (error) {
            console.log(error)
        }
    }

    const deleteMovie = async ( _id ) => {
        try {
            await adminRequest.delete(`/movie/${ _id }`)
            setContext( prev => 
                ({ ...context, movies: prev.movies?.filter( movie => movie._id !== _id )})
            )
        } catch (error) {
            console.log(error)
        }
    }


    const deleteShow = async ( _id ) => {
        try {
            await adminRequest.delete(`/show/${ _id }`)
            setShows( prev => 
                prev?.filter( show => show._id !== _id )
            )
        } catch (error) {
            console.log(error)
        }
    }


    return(
        <section className='my-3'>
            <h1 className='p-3'>Welcome, { context.user?.name }</h1>

            <div className='row mx-0'>
                <div className='col-md-4 col-sm-12 p-2'>
                    <div className='bg-blue-dark rounded my-3 h-100'>
                        <h4 className='px-3 py-2'>Shows</h4>

                        {
                            shows?.map(( show, i ) => 
                                <div className='d-flex justify-content-between align-items-center px-3 py-2 bg-blue-light m-2'>
                                    <div className='d-flex align-items-center' >
                                        <div style={{ width: "50px", height: "50px" }}>
                                            <img src={show.movie?.thumbnail} width={'100%'} height={'100%'} className='image-cover rounded' />
                                        </div>
                                        <h6 className='ms-2 mb-0' style={{ width: '6rem' }}>{show.movie?.title}</h6>
                                    </div>
                                    <div>
                                        <h6 className='mb-0'>{ show.name }</h6>
                                        <p className='mb-0'>{ show.timing?.start } - { show.timing?.end }</p>
                                    </div>
                                    <p className='mb-0 text-danger cursor-pointer' onClick={() => deleteShow( show._id )}>Delete</p>
                                </div>
                            )
                        }

                    </div>
                </div>

                <div className='col-md-8 col-sm-12 p-2'>
                    <div className='bg-blue-dark rounded my-3 h-100'>
                        <h4 className='px-3 py-2'>All Movies</h4>
                        <div className='overflow-auto' style={{ maxHeight: "60vh" }}>
                            {/* {
                                context.movies?.map(( movie, i ) => 
                                    <div className='d-flex justify-content-between align-items-center px-3 py-2 my-2' style={{ backgroundColor: "#182f46" }}>
                                        <div className='d-flex align-items-center' >
                                            <div style={{ width: "50px", height: "50px" }}>
                                                <img src={movie.thumbnail} width={'100%'} height={'100%'} className='image-cover rounded'/>
                                            </div>
                                            <h6 className='ms-2' style={{ width: '6rem' }}>{ movie.title }</h6>
                                        </div>
                                        <h6 style={{ width: '4rem' }}>{ movie.year }</h6>
                                        <h6 style={{ width: '4rem' }}>{ movie.genres.at(1) }</h6>
                                        <button className='btn btn-light btn-sm' style={{ width: '6rem' }}>Create Show</button>
                                    </div>
                                )
                            } */}

                            <Table header={["Name", "Year", "Genre", "Action"]}>
                                {
                                    context.movies?.map((movie, i) =>
                                        <tr key={i}>
                                            <th >
                                                <div className='d-flex align-items-center' >
                                                    <div style={{ width: "50px", height: "50px" }}>
                                                        <img src={movie.thumbnail} width={'100%'} height={'100%'} className='image-cover rounded' />
                                                    </div>
                                                    <h6 className='ms-2' style={{ width: '6rem' }}>{movie.title}</h6>
                                                </div>
                                            </th>
                                            <td>{ movie.year }</td>
                                            <td>{ movie.genres.at(0) }</td>
                                            <td>
                                                <div className='d-flex'>
                                                    <Link to={`/create-show/${ movie._id }`} className='btn btn-light btn-sm' style={{ width: '6rem' }}>Create Show</Link>
                                                    <Link to={`/edit-movie/${ movie._id }`} state={{ movie }} className='text-primary mx-3 mb-0 cursor-pointer'>Edit</Link>
                                                    <p className='text-danger mb-0 cursor-pointer' onClick={() => deleteMovie( movie._id )}>Delete</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }
                            </Table>
                        </div>

                    </div>
                </div>

                <div className='col-md-4 col-sm-12 p-2'>
                    <div className='bg-blue-dark rounded my-3 h-100'>
                        <h4 className='px-3 py-2'>Bookings</h4>

                        {bookings?.map((booking, i) =>
                            <div className='d-flex justify-content-between align-items-center px-3 py-2 bg-blue-light m-2 '>
                                <div className='w-50'>
                                    <div style={{ width: "60px", height: "60px" }}>
                                        <img src={ booking.movie?.thumbnail } width={'100%'} height={'100%'} className='image-cover rounded' />
                                    </div>
                                    <h6>{booking.movie?.title }</h6>
                                </div>
                                <div className='w-50'>
                                    <h6>{ booking.show?.name }</h6>
                                    <p className='mb-0'>{ booking?.show?.timing?.start } - { booking?.show?.timing?.end }</p>
                                </div>
                                <div>
                                    <h6>{ booking.user?.name }</h6>
                                    <p className='mb-0'>{ String(booking.seats) }</p>
                                </div>
                            </div>
                        )}

                    </div>
                </div>

                <div className='col-md-8 col-sm-12 p-2'>
                    <div className='bg-blue-dark my-3 rounded h-100'>
                        <h4 className='p-3'>Users</h4>
                        <div className='overflow-auto' style={{ maxHeight: "60vh" }}>
                            <Table header={["S.no", "Name", "Email", ""]}>
                                {
                                    users?.map((user, i) =>
                                        <tr key={i}>
                                            <th scope="row">{ i+1 }</th>
                                            <td>{ user.name }</td>
                                            <td>{ user.email }</td>
                                            <td>
                                                <div className='d-flex'>
                                                    <Link to={`/edit-user/${ user._id }`} state={{ user }} className='text-primary mx-3 mb-0 cursor-pointer'>Edit</Link>
                                                    <p className='text-danger mb-0 cursor-pointer' onClick={() => deleteUser( user._id ) }>Delete</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }
                            </Table>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}