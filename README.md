# WOLoverHTTP

## Run the server
- install NodeJS
- edit app.js
Insert your mac-address and hostname here.  
Extend the array to add more clients.  
`const arp = [
{hostname: 'yourhostname', mac: '11:11:11:11:11:11}
]`
- in command line:  
`node app.js`

## Wake up the client
send a http request to `http://yourserver:3000/wol/yourhostname`
