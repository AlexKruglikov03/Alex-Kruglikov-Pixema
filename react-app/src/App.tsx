import { Provider } from 'react-redux';
import { store } from 'store/store';
import Router from 'components/Router/Router.jsx';

function App() {
	return (
		<Provider store={store}>
			<div className="container">
				<Router />
			</div>
		</Provider>
	);
}

export default App;
