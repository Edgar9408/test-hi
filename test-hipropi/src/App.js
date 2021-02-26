import './App.css';
import React from 'react';
import { Route } from 'react-router-dom';
import Home from './components/Home/index.jsx';
import Catalogue from './components/Catalogue/index.jsx';
import Details from './components/Details/index.jsx'
import AppContext from './context/Provider'

function App() {
  return (
    <div className="App">
      <AppContext>
        <Route
          exact path='/'
          render={() => <Home />}
        />
        <Route
          path='/catalogue'
          render={() => <Catalogue />}
        />
        <Route
          path='/products/:id'
          render={({match}) => <Details id={match.params.id}/>}
        />
      </AppContext>
    </div>
  );
}

export default App;
