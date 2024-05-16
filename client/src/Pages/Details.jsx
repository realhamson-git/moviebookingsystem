import { useEffect, useMemo } from 'react'
import Image from '../Assets/Images/beauty.jpg'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useMovieContext } from '../Context/MovieContext'


export default () => {
    const params = useParams()
    const navigate = useNavigate()
    const [ context, ] = useMovieContext() 

    const movieDetails = useMemo(() => context.movies.find( movie => movie._id === params.id ) || {}, [ params.id ]) 

    useEffect(() => {
        document.body.style.overflow = "hidden"

        return (
            () => document.body.style.overflow = "scroll"
        )
    }, [])

    const bookNow = () => {
        if( !context.user ){
            return navigate('/login')
        }

        navigate(`/show/${ params.id }`)
    }

    return(
        <>
            <section style={{ position: "relative" }}>
                <div style={{ height: "100vh"}}>
                    <img src={ movieDetails.thumbnail || Image  } width={'100%'} height={'100%'} className='image-cover' />
                </div>
                <div className='movie-details'>
                    <div className='container'>
                        <div className='row pt-5'>
                            <div className='col-md-4 col-sm-12'>
                                <div className='detail-poster'>
                                    <img src={ movieDetails.thumbnail || Image } width={'100%'} height={'100%'} className='image-cover rounded' />
                                </div>
                            </div>

                            <div className='col-md-8 col-sm-12 overflow-auto' style={{ maxHeight:"80vh"}}>
                                <h1 >{ movieDetails.title }</h1>
                                <p className='mb-4'>{ movieDetails.year }</p>

                                <div className='d-flex'>
                                    <div className='bg-danger detail-button p-2 text-center mb-5 cursor-pointer' onClick={() => bookNow() } ><h4 className='mb-0'>Book Now</h4></div>
                                    <div className='bg-light detail-button p-2 text-center mb-5 text-dark mx-3 cursor-pointer' ><h4 className='mb-0'>Watch Trailer</h4></div>
                                </div>

                                <div className='border mb-4 p-3'>
                                    <h4>Rating : 9.0 <span className='fs-1  text-warning'>&#8902;</span> </h4>
                                </div>

                                <div className='mb-3'>
                                    <h3>Overview</h3>
                                    <p>{ movieDetails.extract }</p>
                                </div>

                                <div className='mb-3'>
                                    <h3 className='mb-3'>Cast</h3>
                                    {
                                        movieDetails.cast?.map((cast, i) =>
                                            <div className='d-flex align-items-center m-2 p-2' key={i} >
                                                <div style={{ width: "50px", height: "50px" }}>
                                                    <img src={Image} width={'100%'} height={'100%'} className='image-cover rounded' />
                                                </div>
                                                <p className='ms-3 fs-5 mb-0'>{ cast } </p>
                                            </div>
                                        )
                                    }

                                </div>


                                <div className='mb-3'>
                                    <h3>Year</h3>
                                    <p>{ movieDetails.year }</p>
                                </div>

                                <h3>Genre</h3>
                                {
                                    movieDetails.genres?.map(( genre, i ) => 
                                        <div className='mb-3'>
                                            <p>{ genre }</p>
                                        </div>
                                    )
                                }

                                <div className='mb-3'>
                                    <h3>Language</h3>
                                    <p>Hindi, English</p>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}