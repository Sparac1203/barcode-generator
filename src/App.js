// App.js
import React from 'react';
import BarcodeGenerator from './components/BarcodeGenerator/BarcodeGenerator';
import Footer from './components/Footer/Footer'
import './App.css';

const App = () => {
  return (
    <div>
      {/* <Header /> */}
      <BarcodeGenerator />
      {/* <Footer/> */}
    </div>
  );
};

export default App;
