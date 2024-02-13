import express from 'express';
import * as fs from 'fs';
import * as https from 'https';
import { MFEDefinition } from '../../../packages/common';

const app = express();
const port = 3001;

const key = fs.readFileSync(`${__dirname}/ssl/selfsigned.key`);
const cert = fs.readFileSync(`${__dirname}/ssl/selfsigned.crt`);
const options = {
	key,
	cert,
};

let mfes: MFEDefinition[] = [
	{
		id: 1,
		name: 'mfe1',
		menuName: 'MicroFrontend #1',
		url: 'http://localhost:3002',
	},
	{
		id: 2,
		name: 'mfe2',
		menuName: 'MicroFrontend #2',
		url: 'http://localhost:3003',
	},
];

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.get('/api/mfes', (req, res) => {
	const authHeader = req.header('authorization');
	console.log(authHeader);
	if (authHeader === undefined) {
		res.status(401).send('Unauthorized');
		return;
	}

	// Simulate user1 MicroFrontend list : all MFEs
	if (authHeader.includes('user1')) {
		res.send(JSON.stringify(mfes));
		return;
	}

	// Simulate user2 MicroFrontend list : only MFE1
	if (authHeader.includes('user2')) {
		res.send(JSON.stringify(mfes.filter((mfe) => mfe.id === 1)));
		return;
	}
	res.status(404).send('Not found');
});

const server = https.createServer(options, app);
server.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
