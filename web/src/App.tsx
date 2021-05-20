import React from 'react';
import './Assets/styles/global.css';
import logo from './Assets/images/logo.svg';
import Routes from './routes';

function App() {
  return (
    <div className="App">
      <div className="container">
        <img src={logo} alt="Aircnc"/>
        <div className="content">
        <Routes></Routes>
        </div>
      </div>
    </div>
  );
}
export default App;
