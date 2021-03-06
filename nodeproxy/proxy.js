/**
 * The MIT License (MIT)
 * 
 * Copyright (c) 2014 Joshua Dickson
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var net = require('net');

var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    static = require('node-static');

/**
 * Set up stdin listener
 */
process.stdin.setEncoding('utf8');

process.stdin.on('readable', function(chunk) {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    if(globalSocket) globalSocket.emit('message', data);
  }
});


/**
 * Set up the web server
 */
var tcpAddress = "localhost";
var nodeSocket = 2000;
var globalSocket;

var fileServer = new static.Server('./');
app.listen(nodeSocket);

function handler (request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response); // this will return the correct file
    });
}

/**
 * Set up the socket.io socket 
 */
io.set('log level', 1);
io.sockets.on('connection', function (socket) {

    /**
     * Set the global socket
     */
    globalSocket = socket;

    /**
     * Echo the data event to std out
     */
    socket.on('data', function (data) {
        process.stdout.write(data);
    });
});

