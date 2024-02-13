import { FC } from 'react';
import LoginCard from './LoginCard.tsx';

import './Login.css';

interface LoginParams {
	onLogin: (
		value: ((prevState: string | undefined) => string | undefined) | string
	) => void;
}

const Login: FC<LoginParams> = ({ onLogin }) => (
	<div>
		<h1>Dynamically loaded Micro-frontends Demo</h1>
		<div className="cards-row">
			<LoginCard onClick={onLogin} username="user1" />
			<LoginCard onClick={onLogin} username="user2" />
		</div>
	</div>
);
export default Login;
