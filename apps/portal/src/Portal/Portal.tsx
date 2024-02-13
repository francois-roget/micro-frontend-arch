import { FC, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MFEDefinition } from '@mfe-arch/common';

import './Portal.css';
import Header from '../Components/Header';
import HomePage from '../Components/HomePage';
import MicroFrontend from './MicroFrontend';
import Menu from '../Components/Menu';

interface PortalParams {
	currentUser: string;
	onLogout: () => void;
}

const Portal: FC<PortalParams> = ({ currentUser, onLogout }) => {
	const [modules, setModules] = useState<MFEDefinition[]>([]);

	useEffect(() => {
		fetch('/api/mfes', {
			headers: { Authorization: `bearer ${currentUser}` },
		})
			.then((response) => response.json())
			.then((data) => setModules(data));
	}, []);

	console.log('Rendering Portal', modules);

	return (
		<BrowserRouter>
			<div className="portal">
				<Header currentUser={currentUser} onLogout={onLogout} />
				<div className="layout">
					<Menu modules={modules} />
					<div className="content">
						<Routes>
							{modules.map((mfe) => (
								<Route
									path={`/${mfe.name}/*`}
									key={mfe.name}
									element={
										<MicroFrontend
											key={mfe.name}
											def={mfe}
										/>
									}
								/>
							))}
							<Route
								path="/"
								element={<HomePage currentUser={currentUser} />}
							/>
							<Route
								path="*"
								element={<div>Route not Found</div>}
							/>
						</Routes>
					</div>
				</div>
			</div>
		</BrowserRouter>
	);
};

export default Portal;
