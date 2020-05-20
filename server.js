const path = require('path');
const express = require('express');
const app = express();   
const http = require('http'); 

app.use(express.static(path.join(__dirname, '')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

http.createServer(app).listen(8080, function(){
    console.log('HTTP server listening on port 8080');
});