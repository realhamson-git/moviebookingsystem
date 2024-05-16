import { useNavigate, useParams } from "react-router-dom"
import { useMovieContext } from "../../Context/MovieContext"
import { useMemo } from "react"
import { useForm } from "react-hook-form"
import { adminRequest } from "../../Components/request"

export default () => {
    const params = useParams()
    const navigate = useNavigate()
    const [ context, ] = useMovieContext() 
    const { register, handleSubmit } = useForm({ onChange: true })


    const movieDetails = useMemo(() => context.movies.find( movie => movie._id === params.id ) || {}, [ params.id ]) 

    const createShow = async ( values ) => {
        try{
            const { data } = await adminRequest.post(`/create-show/${ params.id }`, values )
            navigate('/dashboard')
        } catch(error){ console.error(error) }
    }

    return (
        <>
            <h2 className="p-3">Create Show</h2>

            <section className="container">
                <div className="row">
                    <div className="col-md-4 col-sm-12">
                        <div className="detail-poster mb-3">
                            <img src={movieDetails.thumbnail} width={'100%'} height={'100%'} className="image-cover rounded" />
                        </div>
                    </div>

                    <form onSubmit={handleSubmit( createShow )} className='col-md-6 col-sm-12 '>
                        <h1 >{ movieDetails.title }</h1>

                        <h4 className="my-4">Show Name ( default: Show 1 )</h4>
                        <div className="w-100 bg-blue-dark">
                            <input className="search-input w-100 p-3" placeholder="Show Name" {...register('name') }/>
                        </div>

                        <h4 className="my-4">Show Time</h4>

                        <div className="d-flex align-items-denter">
                            <div className="w-100 me-2">
                                <p>Start Time</p>
                                <div className="w-100 bg-blue-dark">
                                    <input type="time" className="search-input w-100 p-3" placeholder="Start Time" {...register('timing.start')} required={true} />
                                </div>
                            </div>

                            <div className=" w-100 ms-2">
                                <p>End Time</p>
                                <div className="w-100 bg-blue-dark">
                                    <input type="time" className="search-input w-100 p-3" placeholder="End Time" {...register('timing.end')} required={true}/>
                                </div>
                            </div>

                        </div>

                        <button type="submit" className="bg-light w-100 p-3 text-dark mt-4 text-center cursor-pointer">
                            Create Show
                        </button>
                    </form>
                </div>
            </section>
        </>
    )
}