import { useForm } from "react-hook-form"
import { adminRequest } from "../../Components/request"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react"

export default () => {
    const { register, handleSubmit, reset } = useForm({ onChange: true })
    const navigate = useNavigate()
    const { state } = useLocation()

    useEffect(() => {
        reset( state.user )
    }, [])

    const editUser = async ( values ) => {
        try {
            await adminRequest.post('/user', values )
            navigate('/dashboard')
        } catch (error) {
            console.log( error )
        }
    }

    return (
        <div className="container">
            <h1 className="p-3">Edit User</h1>
            <div className="row">
                <div className="col-md-6 col-sm-12 p-3">
                    <form onSubmit={handleSubmit(editUser)}>
                        <div className="my-3">
                            <div>
                                <label>Name</label>
                                <div className="w-100 bg-blue-dark my-2">
                                    <input className="search-input p-3 w-100" placeholder="Enter Name" {...register('name')} required={true} />
                                </div>
                            </div>
                        </div>

                        <div className="my-3">
                            <div>
                                <label>Email Address</label>
                                <div className="w-100 bg-blue-dark my-2">
                                    <input className="search-input p-3 w-100" placeholder="Enter Email Address" {...register('email')} required={true} />
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="bg-light w-100 p-3 text-dark mt-4 text-center cursor-pointer">
                            Edit User
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}