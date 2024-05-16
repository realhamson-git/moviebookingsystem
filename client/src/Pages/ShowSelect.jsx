import { useEffect, useState } from "react"
import { request } from "../Components/request"
import { Link, useParams } from "react-router-dom"

export default () => {
    const params = useParams()
    const [ selectedShow, setSelectedShow ] = useState(null)
    const [ shows, setShows ] = useState([])

    useEffect(() => {
        getShows()
    }, [])

    const getShows = async () => {
        try{
            const { data } = await request.get(`/show/${ params.id }`)
            setShows( data.shows )
        }catch(error){ console.log(error) }
    }

    return (
        <section className="container">
                <div className="d-flex justify-content-between my-4">
                    <h2 className="">Shows</h2>
                    {selectedShow && <Link to={`/seats/${ selectedShow }`} className="bg-light px-4 py-2 text-dark text-center mb-0 cursor-pointer">Continue</Link>}
                </div>
            
            <div className="d-flex justify-content-center flex-wrap w-100" >
                {
                    shows?.map(( show, i ) => 
                        <div className={`d-flex flex-column align-items-center w-25 px-5 py-2 cursor-pointer ${ selectedShow === show._id ? "bg-blue-light" : "bg-blue-dark"}`} key={i} onClick={() => selectedShow === show._id ? setSelectedShow(null) : setSelectedShow(show._id)}>
                            <h5>{ show.name }</h5>
                            <p className="mb-0">{ show.timing?.start } - { show.timing?.end }</p>
                        </div>
                    )
                }
            </div>
        </section>

    )
}