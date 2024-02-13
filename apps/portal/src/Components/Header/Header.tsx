import * as React from 'react';

import './Header.css';

type Props = {
	currentUser: string;
	onLogout: () => void;
};

const Header: React.FC<Props> = ({ onLogout, currentUser }) => (
	<div className="header">
		<h1>Micro-frontend App</h1>
		<div className="login-info">
			Logged in as {currentUser}
			<button onClick={onLogout}>Logout</button>
		</div>
	</div>
);

export default Header;
