import { Manifest, MicroFrontendDefinition, ModuleDefinition } from '../types';

let moduleCache: ModuleDefinition[] = [];

if (!window.microFrontends) {
	window.microFrontends = {};
}

export const getManifest = async (def: ModuleDefinition): Promise<Manifest> => {
	if (def.manifest) {
		return def.manifest;
	}
	const resp = await fetch(`${def.url}/manifest.json`);
	return resp.json();
};
export const fetchModulesList = async (): Promise<ModuleDefinition[]> => {
	try {
		const resp = await fetch('/api/mfes');
		const modules: ModuleDefinition[] = await resp.json();
		const all = await Promise.all(
			modules.map(async (m) => {
				try {
					const manifest = await getManifest(m);
					return { ...m, manifest };
				} catch (e) {
					// eslint-disable-next-line no-console
					console.error(`Unable to get MFE Manifest at ${m.url}`);
					return undefined;
				}
			})
		);
		return all.filter((m) => m !== undefined) as ModuleDefinition[];
	} catch (e) {
		throw new Error(`Unable to get module list: ${(e as Error).message}`);
	}
};

export const getModuleList = async (): Promise<ModuleDefinition[]> => {
	if (moduleCache.length === 0) {
		moduleCache = await fetchModulesList();
	}
	return moduleCache;
};

export const getMFEDefinition = (
	path: string,
	fileName: string,
	componentName: string
): Promise<MicroFrontendDefinition> => {
	if (window.microFrontends && window.microFrontends[componentName]) {
		return Promise.resolve(window.microFrontends[componentName]);
	}
	const loadModuleFromDOM =
		(
			resolve: (
				value:
					| MicroFrontendDefinition
					| PromiseLike<MicroFrontendDefinition>
			) => void,
			reject: (reason?: Error) => void
		) =>
		() => {
			if (
				!window.microFrontends ||
				!window.microFrontends[componentName]
			) {
				reject(
					new Error(
						`Unable to find module ${componentName} at ${path}/${fileName} for name ${componentName}`
					)
				);
			}

			const definition: MicroFrontendDefinition =
				window.microFrontends[componentName];
			resolve(definition);
		};

	return new Promise((resolve, reject): void => {
		let cleanFileName = fileName;
		if (cleanFileName.startsWith('/')) {
			cleanFileName = cleanFileName.substr(1);
		}

		const script = document.createElement('script');
		script.src = `${path}/${cleanFileName}`;
		script.type = 'text/javascript';
		script.onload = loadModuleFromDOM(resolve, reject);
		script.onerror = (error): void => {
			console.error(error); // eslint-disable-line
			return reject(
				new Error(`Failed to download module from url ${path}`)
			);
		};
		document.body.appendChild(script);
	});
};
