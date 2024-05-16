import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form'
import { request } from "../Components/request";
import { useMovieContext } from "../Context/MovieContext";

export default () => {
    const { register, handleSubmit } = useForm({ onChange: true })
    const navigate = useNavigate()
    const [ context, setContext ] = useMovieContext()


    const createUser = async ( values ) => {
        try{
            
            const { data } = await request.post('/create-user', values)
            localStorage.setItem('token', data.token )
            localStorage.setItem('user', JSON.stringify( data.user ))

            setContext( prev => ({ ...prev, user: data.user }))
            navigate('/dashboard')
        }catch(error){ console.log(error) }
    }


    return(
        <section className="w-100 d-flex justify-content-center align-items-center" >
            <form onSubmit={handleSubmit( createUser )} className="bg-blue-dark p-3 rounded w-100  flex-column my-5 login-form">
                <h2>Register</h2>

                <div className=" my-3">
                    <p>Name</p>
                    <div className="bg-blue-light p-2 rounded">
                        <input className="search-input w-100" placeholder="Enter Name" {...register('name')} required={true} />
                    </div>
                </div>

                <div className=" my-3">
                    <p>Email Address</p>
                    <div className="bg-blue-light p-2 rounded">
                        <input type="email" className="search-input w-100" placeholder="Enter Email" {...register('email')} required={true}  />
                    </div>
                </div>

                

                <div className=" my-3">
                    <p>Password</p>
                    <div className="bg-blue-light p-2 rounded">
                        <input type="password" className="search-input w-100" placeholder="Enter Password" {...register('password')} required={true}  />
                    </div>
                </div>

                <button type="submit" className="btn btn-light w-100 my-3">Register</button>
                <p>If registered, click <Link to={'/login'} className="text-primary">Login</Link></p>

            </form>

        </section>
    ) 
}