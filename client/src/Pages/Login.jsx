import { Link, useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form'
import { request } from "../Components/request"
import { useMovieContext } from "../Context/MovieContext"


export default () => {
    const { register, handleSubmit } = useForm({ onChange: true })
    const navigate = useNavigate()
    const [ context, setContext ] = useMovieContext()


    const login = async ( values ) => {
        try{
            const { data } = await request.post('/login', values )
            localStorage.setItem('token', data.token )
            localStorage.setItem('user', JSON.stringify( data.user ))
            
            setContext( prev => ({ ...prev, user: data.user }))
            navigate('/dashboard')
        } catch(error){ 
            console.log(error.response?.data ) 
            window.alert( error.response?.data?.message )
        }
    }

    return (
        <section className="w-100 d-flex justify-content-center align-items-center" >
            <form onSubmit={handleSubmit( login )} className="bg-blue-dark p-3 rounded w-100  flex-column my-5 login-form">
                <h2>Login</h2>

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

                <button className="btn btn-light w-100 my-3" type="submit" >Login</button>
                <p>If not registered, click <Link to={'/register'} className="text-primary">Register</Link></p>

            </form>

        </section>
    )
}