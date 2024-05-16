import './Assets/css/mediaquery.css'

import Header from './Components/Header';
import { MovieContextProvider } from './Context/MovieContext';
import AppRoutes from './Routes';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <MovieContextProvider>
        <div className="App">
          <Header />
          <AppRoutes />
        </div>
      </MovieContextProvider>
    </Router>
  );
}

export default App;
