import Card from '../Components/Cards/Card'
import Tiles from '../Components/Cards/Tiles'
import Search from '../Components/Search'
import Poster from '../Assets/Images/hp.webp'
import Container from '../Components/Container'

import { useEffect, useState } from 'react'
import { request } from '../Components/request'
import { useMovieContext } from '../Context/MovieContext'

export default () => {
    const [ context, setContext ] = useMovieContext()
    const [ shows, setShows ] = useState([])


    useEffect(() => {
        getShows()

        if( !context.movies?.length ){
            getAllMovies();
        }
    }, [ context ])

    const getAllMovies = async () => {
        try{
            const { data } = await request.get('/movies')
            setContext( prev => ({ ...prev, movies: data.movies }))
        } catch(error){}
    }

    const getShows = async () => {
        try{
            const { data } = await request.get('/shows', { params: { isUnique: true }})
            setShows( data.shows )
        }catch(error){ console.log(error) }
    }

    return(
        <Container>
            <Search />
            <section className='my-5'>
                <div className='row p-3 m-0 rounded' style={{ backgroundColor: "rgb(12, 32, 51)" }}>
                    <div className='col-md-8 col-sm-12 px-0'>
                        <div className='rounded' style={{ height: '30rem' }}>
                            <img src={ Poster } className='rounded' width={'100%'} height={'100%'} />
                        </div>
                    </div>
                    <div className='col-md-4 col-sm-12 px-0'>
                        <div className='overflow-auto movie-card-tile' style={{ maxHeight: '30rem' }}>
                            {
                                context.movies.map(( movie, index )=> 
                                    <Tiles movie={movie} />
                                )
                            }
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Latest Shows */}
            <section className='my-5'>
                <h2 className='mb-4'>Latest Shows</h2>

                <div className='d-flex flex-row overflow-auto pb-3'>
                    {
                        shows?.map(( show, i ) => <Card show={show} key={i} /> )
                    }
                </div>
            </section>

        </Container>
    )
}