
import { BrowserRouter, Routes , Route} from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Create from './Components/Create';
import Read from './Components/Read';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <div>
            <Navbar/>
          </div>

          <Routes>
            <Route exact path="/home" element={<Home />}></Route>
            <Route exact path="/create" element={<Create />}></Route>
            <Route exact path="/read" element={<Read />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/signup" element={<Signup />}></Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
