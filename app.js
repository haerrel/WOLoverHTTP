// EXPRESS
const express = require('express')
const app = express();
const port = 3000;

// WOL
const wol = require('node-wol');

// "ARP"-TABLE
const arp = [
	{hostname: 'andreas', mac: '1C:1B:0D:67:34:46'}
];

app.get('/', (req, res) => res.send('WOLoverHTTP is running!'));
app.get('/wol/:hostname', (req, res) => {
	const hostname = req.params.hostname.toLowerCase();
	const arpEntry = arp.find(entry => entry.hostname === hostname);
	if (arpEntry) {
		wol.wake(arpEntry.mac, error => {});
		// Verify that server is running
		res.send(`triggered ${hostname} to wakeup`);
	} else {
		res.send('no valid hostname');
	}
});

app.listen(port, () => console.log(`WOLoverHTTP-Server listening on port ${port}!`))
