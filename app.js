// IMPORTS
const express = require('express');
const wol = require('node-wol');
const fs = require("fs");
const path = require('path');

// LOGIC
const default_arp_table_file = path.join(path.dirname(require.main.filename), 'arp_table.json');

class WolServer {

	constructor() {
		this.app = express();
		this.addHttpHandler();	
	}

	/**
	 * Starts the server
	 * @param {*} port Port
	 * @param {*} arp_table_file Filepath to ARP-Table file
	 */
	start(port, arp_table_file = default_arp_table_file) {
		this.port = port;
		this.arp_table_file = arp_table_file;
		this.importArpInformation(arp_table_file);
		this.app.listen(port, () => console.log(`WOLoverHTTP-Server listening on port ${port}!`));
	}

	/**
	 * Helper to attach the http handler to the server
	 */
	addHttpHandler() {
		this.app.get('/', (req, res) => res.send('WOLoverHTTP is running!'));
		this.app.get('/wol/:hostname', (req, res) => {
			const hostname = req.params.hostname.toLowerCase();
			const arpEntry = this.arp.find(entry => entry.hostname === hostname);
			if (arpEntry) {
				wol.wake(arpEntry.mac, error => {});
				// Verify that server is running
				res.send(`triggered ${hostname} to wakeup`);
			} else {
				res.send('no valid hostname');
			}
		});		
	}

	/**
	 * Helper to import the arp information from a file
	 * @param {*} filepath Filepath to ARP-Table file
	 */
	importArpInformation(filepath) {
		const arp_table_file = fs.readFileSync(filepath);
		this.arp = JSON.parse(arp_table_file);
	}
}

// EXPORTS
module.exports = WolServer;