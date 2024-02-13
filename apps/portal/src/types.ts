import { ComponentType } from 'react';
import { MFEDefinition } from '@mfe-arch/common';

export type MicroFrontendProps = {
	name: string;
};

export type Manifest = {
	[index: string]: {
		js: string;
		css: string;
	};
};

export type MicroFrontendDefinition = {
	mainComponent: ComponentType<MicroFrontendProps>;
	menuTitle: string;
};

export type ModuleDefinition = MFEDefinition & {
	manifest?: Manifest;
};
