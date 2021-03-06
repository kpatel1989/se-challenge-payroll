import React from 'react';

import './App.css';
import UploadFile from './UploadFile';
import Report from './Report';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Wave Payroll System
      </header>
      <hr></hr>
      <UploadFile></UploadFile>
      <hr></hr>
      <Report></Report>
    </div>
  );
}

export default App;
