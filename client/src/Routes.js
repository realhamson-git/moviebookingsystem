import { Suspense, React, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useMovieContext } from './Context/MovieContext';

import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';

import Details from './Pages/Details'
import UserDashboard from './Pages/User/Dashboard'

import AdminDashboard from './Pages/Admin/Dashboard'
import CreateShow from './Pages/Admin/Show'

import Seats from './Pages/Seats'
import Show from './Pages/ShowSelect'
import Booked from './Pages/Booked'

import EditUser from './Pages/Admin/EditUser';
import Search from './Pages/Search';
import EditMovie from './Pages/Admin/EditMovie';

export default () => {
    const [ context ] = useMovieContext()
    
    const conditionalRoutes = useMemo(() => {

        if (!context.user) {
            return (
                <>
                    <Route exact path='/login' Component={Login} />
                    <Route exact path='/register' Component={Register} />
                </>
            )
        }

        // Admin Routes 
        if( context.user?.email == "demo@admin.com" ){
            return (
                <>
                    <Route exact path='/dashboard' Component={AdminDashboard} />
                    <Route exact path='/edit-user/:userID' Component={EditUser} />
                    <Route exact path='/edit-movie/:movieID' Component={EditMovie} />
                    <Route exact path='/create-show/:id' Component={CreateShow} />
                </>
            )
        } else {
            // User Routes
            return (
                <>
                    <Route exact path='/dashboard' Component={UserDashboard} />
                </>
            )
        }
    }, [ context ])

    return(
        <Suspense>
            <Routes>
                <Route exact path='/' Component={Home} />
                <Route exact path='/search' Component={Search} />

                <Route exact path='/details/:id' Component={Details} />
                <Route exact path='/show/:id' Component={Show} />

                <Route exact path='/seats/:showID' Component={Seats} />
                <Route exact path="/book" Component={Booked} />

                { conditionalRoutes }
                <Route exact path='/*' Component={Home} />
            </Routes>
        </Suspense>
    )
}