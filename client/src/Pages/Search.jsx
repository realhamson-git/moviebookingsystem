import Search from "../Components/Search"
import Image from '../Assets/Images/beauty.jpg'
import Container from "../Components/Container"
import { useEffect, useState } from "react"
import { Link, useLocation, useSearchParams } from "react-router-dom"
import { request } from "../Components/request"


export default () => {
    const [searchParams, ] = useSearchParams()
    const searchQuery = searchParams.get("q")
    const [ movies, setMovies ] = useState([])

    useEffect(() => {
        console.log( searchQuery )
        search()
    }, [ searchQuery ])

    const search = async () => {
        try {
            const { data } = await request.get('/movies', { params: { search: searchQuery }})
            setMovies( data.movies )
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <Container>
            <div className="mt-3">
                <Search />
            </div>

            <section className="overflow-auto" style={{ maxHeight: '80vh'}}>
                {movies?.map(( movie, i ) => <Link to={`/details/${ movie._id }`} key={i} className="d-flex bg-blue-dark p-2 rounded align-items-center my-2 text-light">
                    <div className="ms-3" style={{ width: "100px", height: "100px" }}>
                        <img src={ movie.thumbnail } className="image-cover rounded" width={'100%'} height={'100%'} />
                    </div>
                    <div className="ms-4">
                        <h3 >{ movie.title }</h3>
                        <p>{ movie.year }</p>
                    </div>
                </Link>)}

            </section>
        </Container>
    )
}