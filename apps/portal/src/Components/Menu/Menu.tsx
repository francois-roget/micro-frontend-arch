import { FC } from 'react';
import { MFEDefinition } from '@mfe-arch/common';
import { Link } from 'react-router-dom';

type Props = {
	modules: MFEDefinition[];
};
const Menu: FC<Props> = ({ modules }) => (
	<div className="menu">
		<h3>Menu</h3>
		<ul>
			<li>
				<Link to={'/'}>Home</Link>
			</li>

			{modules.map((module) => (
				<li key={module.name}>
					<Link to={`/${module.name}`}>{module.menuName}</Link>
				</li>
			))}
		</ul>
	</div>
);

export default Menu;
