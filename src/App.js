import React from 'react';
import './App.css';
import {
  Switch,
  Route
} from "react-router-dom";
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" render={()=> <HomePage/>}/>
      </Switch>
    </div>
  );
}

export default App;
