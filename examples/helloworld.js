var sys = require("util")
sys.puts("hello");
setTimeout(function() {
    sys.puts("world");
}, 2000);

