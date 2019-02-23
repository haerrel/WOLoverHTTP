# WOLoverHTTP

## Run the server
- install NodeJS
- clone repo
- npm install
- create arp_table.json
Insert your mac-address and hostname here.  
Extend the array to add more clients.  
`[
{hostname: 'yourhostname', mac: '11:11:11:11:11:11}
]`
- implement in your script
`require('app.js')`
TBD

## Wake up the client
send a http request to `http://yourserver:3000/wol/yourhostname`
