import React from 'react';
import './App.css';
import './index.css';
import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <h2 className='your-list-title jersey-20'>Your list:</h2>
    </div>
  );
}

export default App;