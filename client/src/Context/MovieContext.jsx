const { createContext, useContext, useState, useMemo } = require("react");

const MovieContext = createContext();

export const MovieContextProvider = ({ children }) => {
    const [ context, setContext ] = useState({ 
        movies: [], 
        user: localStorage.user ? JSON.parse( localStorage.user ) : null
    })

    const value = useMemo(() => [ context, setContext ], [ context ])
    console.log('<<<<<<<<<<')
    return(
        <MovieContext.Provider value={ value } >
            { children }
        </MovieContext.Provider>
    )
}

export const useMovieContext = () => {
    console.log('>>>>>>>>>')
    const values = useContext( MovieContext )
    return values 
}
