import { Link } from 'react-router-dom'
import Image from '../../Assets/Images/beauty.jpg'

export default ({ movie = {} }) => {
    return (
        <Link to={`/details/${ movie._id }`} className='d-flex mb-1 ps-3 py-2 text-light' style={{ textDecoration: "none" }}>
            <div style={{ minWidth: "100px", width: "100px", height: "100px" }}>
                <img src={ movie.thumbnail || Image} className='rounded' width={'100%'} height={'100%'} />
            </div>
            <div className='ms-3 w-100'>
                <h5 className='mb-0'>{ movie.title }</h5>
                <p className='mb-1'>{ movie.year }</p>
                <div className='p-1 bg-light text-dark text-center rounded cursor-pointer'>Book Now</div>
            </div>
        </Link>
    )
}