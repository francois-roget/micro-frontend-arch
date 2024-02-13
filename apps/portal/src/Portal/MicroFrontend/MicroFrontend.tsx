import * as React from 'react';
import { ModuleDefinition, Manifest } from '../../types';
import { getManifest } from '../../services/ModuleService';
import AsyncComponent from './AsyncComponent';
import { useEffect } from 'react';
import ErrorGuard from './ErrorGuard.tsx';
import { getCachedManifest, setManifestToCache } from './ManifestCache.ts';

type Props = { def: ModuleDefinition };

const MicroFrontend: React.FC<Props> = ({ def }) => {
	const [manifest, setManifest] = React.useState<Manifest | undefined>(
		getCachedManifest(def.name)
	);
	const [error, setError] = React.useState<Error | undefined>(undefined);

	useEffect(() => {
		console.log('Getting manifest for', def.name, def.url);
		if (!manifest) {
			getManifest(def)
				.then((m) => {
					setManifest(m);
					setManifestToCache(def.name, m);
					setError(undefined);
				})
				.catch((e) => {
					setManifest(undefined);
					setError(e);
				});
		}
	}, [def]);

	if (error) {
		return (
			<span>
				Error loading micro-frontend manifest for "{def.name}" (at{' '}
				{def.url}) :{error.message}
			</span>
		);
	}

	if (!manifest) {
		return <span>Loading...</span>;
	}

	return (
		<ErrorGuard>
			<AsyncComponent
				name={def.name}
				url={def.url}
				fileName={manifest.main.js}
			/>
		</ErrorGuard>
	);
};

export default MicroFrontend;
