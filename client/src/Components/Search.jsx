import { useRef, useState } from "react"
import { useNavigate, Link } from "react-router-dom"

export default () => {
    const [ input, setInput ] = useState("")

    return(
        <div className="bg-blue-dark my-4 p-2 mx-0 d-flex rounded">
            <input className="search-input w-100 ms-3" placeholder="Search By Movies, Genres, Cast" onChange={(e) => setInput(e.target.value)} />
            <Link to={{ pathname: '/search', search: `?q=${ input }` }} className="bg-blue-light px-4 py-2 rounded cursor-pointer text-decoration-none text-light" >Search</Link>
        </div>
    )
}