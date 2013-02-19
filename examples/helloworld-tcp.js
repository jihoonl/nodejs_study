var tcp = require("net");
 
console.log('Starting server');
 tcp.createServer(function(c) {
    console.log(c);
    c.write("hello world!\n");
    c.end();
 }).listen(8000);

