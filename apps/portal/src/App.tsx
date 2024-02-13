import { useState } from 'react';
import './App.css';
import Portal from './Portal';
import Login from './Login';

function App() {
	const [currentUser, setCurrentUser] = useState<string | undefined>(
		undefined
	);

	const logout = () => {
		setCurrentUser(undefined);
	};

	if (currentUser) {
		return <Portal currentUser={currentUser} onLogout={logout} />;
	}
	return <Login onLogin={setCurrentUser} />;
}

export default App;
