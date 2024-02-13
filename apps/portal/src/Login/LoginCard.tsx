import { FC } from 'react';

interface LoginCardParams {
	username: string;
	onClick: (userName: string) => void;
}

const LoginCard: FC<LoginCardParams> = ({ onClick, username }) => (
	<div className="card loginCard">
		Login as {username}
		<div className="loginBtn">
			<button onClick={() => onClick(username)}>login</button>
		</div>
	</div>
);

export default LoginCard;
