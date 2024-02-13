import { ComponentType } from 'react';

import Module from './Module';
import PackageFile from '../package.json';

type MicroFrontendDefinition = {
	mainComponent: ComponentType;
	menuTitle: string;
};

declare global {
	interface Window {
		microFrontends: { [key: string]: MicroFrontendDefinition };
	}
}

const moduleName = PackageFile.MfeModuleName;

const definition: MicroFrontendDefinition = {
	mainComponent: Module,
	menuTitle: moduleName,
};

console.log('Registering module', moduleName, definition);

window.microFrontends = window.microFrontends || {};
window.microFrontends[moduleName] = definition;
