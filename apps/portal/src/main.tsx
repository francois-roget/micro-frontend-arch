import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { MicroFrontendDefinition } from './types.ts';

declare global {
	interface Window {
		microFrontends: { [key: string]: MicroFrontendDefinition };
	}
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);

window.React = React;
