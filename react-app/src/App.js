import { Route, Routes, BrowserRouter, NavLink } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Home from './pages/Home.tsx';


function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path = '/' element={<Home/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
