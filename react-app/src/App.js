import { Route, Routes, BrowserRouter, NavLink } from 'react-router-dom';
import MovieCard from './components/MovieCard/index.jsx';
import Header from './components/Header/index.jsx';


function App() {
  return (
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
}

export default App;
