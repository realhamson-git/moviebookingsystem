import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useMovieContext } from "../../Context/MovieContext"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { adminRequest } from "../../Components/request"

export default () => {
    
    const params = useParams()
    const navigate = useNavigate()
    const { state } = useLocation()

    const [ context, setContext ] = useMovieContext()
    const { register, handleSubmit, reset } = useForm({ onChange: true })

    
    useEffect(() => {
        reset( state?.movie )
    }, [])


    const editMovie = async ( values ) => {
        try{
            await adminRequest.post(`/edit-movie/${ params.movieID }`, values )
            
            setContext(
                prev => ({
                    ...prev,
                    movies: prev.movies.map(movie => {
                        if (movie._id === params.movieID) movie = values
                        return movie
                    })
                })
            )

            navigate('/dashboard')
        } catch(error){ console.error(error) }
    }

    return (
        <>
            <section className="container my-5">
                <div className="row">
                    <div className="col-md-4 col-sm-12">
                        <div className="detail-poster mb-3">
                            <img src={state.movie?.thumbnail} width={'100%'} height={'100%'} className="image-cover rounded" />
                        </div>
                    </div>

                    <form onSubmit={handleSubmit( editMovie )} className='col-md-6 col-sm-12 pb-5'>
                        <h1 >Edit Movie</h1>

                        <h4 className="my-4">Title</h4>
                        <div className="w-100 bg-blue-dark">
                            <input className="search-input w-100 p-3" placeholder="Show Name" {...register('title') }/>
                        </div>

                        <h4 className="my-4">Description</h4>
                        <div className="w-100 bg-blue-dark">
                            <textarea className="search-input w-100 p-3" rows={6} placeholder="Description" {...register('extract') } />
                        </div>
                        
                        <h4 className="my-4">Year</h4>
                        <div className="w-100 bg-blue-dark">
                            <input className="search-input w-100 p-3" placeholder="Show Name" {...register('year') }/>
                        </div>

                        <h4 className="my-4">Casts</h4>
                        <div className="row">
                            {state?.movie?.cast?.map(( cast, i )=> <div className="p-2 col-md-6 col-sm-12" key={i}>
                                <div className="bg-blue-dark">
                                    <input className="search-input w-100 p-3" placeholder="Cast Name" {...register(`cast[${i}]`) }/>
                                </div>
                            </div>)}
                            
                        </div>

                        <h4 className="my-4">Genres</h4>

                        <div className="row">
                            {state?.movie?.genres?.map(( cast, i )=> <div className="p-2 col-md-6 col-sm-12" key={i}>
                                <div className="bg-blue-dark">
                                    <input className="search-input w-100 p-3" placeholder="Cast Name" {...register(`genres[${i}]`) }/>
                                </div>
                            </div>)}                            
                        </div>

                        <button type="submit" className="bg-light w-100 p-3 text-dark mt-4 text-center cursor-pointer">
                            Save
                        </button>
                    </form>
                </div>
            </section>
        </>
    )
}