import React from 'react';
import './App.css';
import { HashRouter } from 'react-router-dom'
import Vote from './Vote';


function App() {
  return (
    <div className="App">
      <HashRouter>
        <Vote />
      </HashRouter>
    </div>
  );
}

export default App;
