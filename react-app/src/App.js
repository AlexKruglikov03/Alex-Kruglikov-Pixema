import PageLayout from 'pages/PageLayout';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Home from './pages/Home.tsx';

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<PageLayout />}>
					<Route index element={<Home />}></Route>
					<Route path="*" element={<Home />}></Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
