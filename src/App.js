import './App.css';
import { Routes,Route } from 'react-router-dom';

import Headers from './component/Header';
import Home from './page/Home';
import Success from './page/Success';

function App() {
  return (
    <div className="App">
        <Headers/>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/success" element={<Success/>}></Route>
        </Routes>
    </div>
  );
}

export default App;
