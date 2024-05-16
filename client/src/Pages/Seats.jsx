import { useEffect, useState } from "react"
import { request } from '../Components/request'
import { Link, useParams } from 'react-router-dom'

export default () => {
    const params = useParams()

    useEffect(() => {
        getSeats()
    }, [])

    const row = ["A", "B", "C", "D", "E"]
    const column = [1, 2, 3, 4]

    const [selectedSeat, setSelectedSeat] = useState([])
    const [bookedSeats, setBookedSeats ] = useState([])

    const select = (seat) => {
        if(bookedSeats.includes(seat)) return


        if (selectedSeat.includes(seat)) return setSelectedSeat(prev => prev.filter(prevseat => prevseat !== seat))
        setSelectedSeat(prev => [...prev, seat])
    }

    const getSeats = async () => {
        try{
            const { data } = await request.get(`/seats/${ params.showID }`)
            const seats = data?.seats?.map( seat => seat.seats )

            setBookedSeats( String( seats ).split(',') )
        }catch(error){ console.log(error) }
    }

    return (
        <>
            <div className="container">
                <div className="d-flex justify-content-between my-4">
                    <h2 className="">Seats</h2>
                    {selectedSeat.length > 0 && <Link to={'/book'} state={{ showID: params.showID, seats: selectedSeat }} className="bg-light px-4 py-2 text-dark text-center mb-0 cursor-pointer">Continue</Link>}
                </div>

                <section className=" d-flex justify-content-center flex-wrap w-100">
                    {
                        column.map(a =>
                            row.map(b =>
                                <div key={ a+b } className={`${selectedSeat.includes(a + b)  ? "bg-blue-light" :  bookedSeats.includes(a+b) ? "bg-danger" : "bg-blue-dark"} rounded m-2 d-flex ${ !bookedSeats.includes(a+b) && "cursor-pointer" }`}
                                    style={{ width: "18%", height: "100px" }}
                                    onClick={() => select(a + b)}>

                                    <p className="m-auto">{a + b}</p>

                                </div>
                            )
                        )
                    }

                </section>
            </div>

        </>
    )
}