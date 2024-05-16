import { Link } from 'react-router-dom'
import Image from '../../Assets/Images/beauty.jpg'


export default ({ show = {} }) => {
    return (
        <Link to={`/details/${ show.movie?._id }`} className='col-md-3 col-sm-6 text-light' style={{ position: "relative", textDecoration: "none" }}>
            <div className='rounded  cursor-pointer bg-dark mx-3' style={{ height: "300px", minWidth: "200px" }}>
                <img src={ show?.movie?.thumbnail || Image } className='image-cover rounded' width={'100%'} height={'100%'} style={{ zIndex: -1 }} />
            </div>
            <div className='movie-card-title mx-3'>
                <h3 className='ms-3'>{ show.movie?.title }</h3>
            </div>
        </Link>
    )
}