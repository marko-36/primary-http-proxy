const fs = require('fs');
const http = require('http');
const https = require('https');
const httpProxy = require('http-proxy');
const hosts = {  
  'domainna.me':'https://localhost:5002',
	'domainna.me':'http://localhost:5002',
  'localhost':'https://localhost:5002',
  '127.0.0.1':'http://marvel.com' // Works with domain names only. Fails on IP addresses 
}


// const server1 = http.createServer(function(req, res){

// }).listen(80, function(){
//     console.log ('server1 Listening on port 80');
// });

const proxy2 = httpProxy.createServer();
const server2 = https.createServer(function(req, res){
  proxy2.web(req, res, {
    ssl: {
      key: fs.readFileSync('./iddqd1993/private.key', 'utf8'),
      cert: fs.readFileSync('./iddqd1993/certificate.crt', 'utf8')
    },
    target:'https://localhost:5022', // Fixed link for testing purposes.'
    //target:hosts[req.headers.host],
    secure: false // Depends on your needs, could be false.
  });

  proxy2.on('proxyReq', function(){
    console.log('incoming HTTPS');
    });

  //res.end('Something went wrfdsfdsfong.' );

  // proxy2.on('error', function (err, req, res) {
  //   res.writeHead(500, {
  //     'Content-Type': 'text/plain'
  //   });
  //   res.end('Something went wrong.' +err);
  // }); 
}).listen(443, function(){
  console.log ('server2 Listening on port 443');
});