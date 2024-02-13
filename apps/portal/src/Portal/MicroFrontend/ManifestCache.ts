import { Manifest } from '../../types.ts';

type ManifestCache = {
	[name: string]: Manifest;
};

const cache: ManifestCache = {};

export const getCachedManifest = (name: string): Manifest => cache[name];

export const setManifestToCache = (name: string, manifest: Manifest): void => {
	cache[name] = manifest;
};
