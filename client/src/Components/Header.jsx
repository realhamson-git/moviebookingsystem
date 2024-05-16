import { Link, useNavigate } from "react-router-dom"
import { useMovieContext } from "../Context/MovieContext"

export default () => {
    const [ context, setContext ] = useMovieContext()
    const navigate = useNavigate()

    const logout = () => {
        localStorage.clear()
        setContext( prev => ({ ...prev, user: null }))

        navigate('/')
    }

    return (
        <nav className="navbar navbar-expand-lg p-2">
            <div className="container-fluid">
                <Link to={'/'} className="navbar-brand" >
                    MV Booking System
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse ">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                        {/* <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">
                                Home
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">
                                Login
                            </a>
                        </li>
                       
                        <li className="nav-item">
                            <a className="nav-link disabled" aria-disabled="true">
                                Disabled
                            </a>
                        </li> */}
                    </ul>
                    {
                        context.user
                            ?<>
                                <Link to={'/dashboard'} className="btn btn-light">Dashboard</Link>
                                <p className="text-light ms-3 mb-0 cursor-pointer" onClick={() => logout()}>Logout</p>
                            </>
                            : <Link to={'/login'} className="btn btn-light">Login</Link>
                    }
                </div>
            </div>
        </nav>

    )
}