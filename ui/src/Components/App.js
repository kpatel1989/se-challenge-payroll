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
      <UploadFile></UploadFile>
      <Report></Report>
    </div>
  );
}

export default App;
