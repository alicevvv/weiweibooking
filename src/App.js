import './App.css';
import { Routes,Route } from 'react-router-dom';

import Headers from './component/Header';
import Home from './page/Home';

function App() {
  return (
    <div className="App">
        <Headers/>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
        </Routes>
    </div>
  );
}

export default App;
