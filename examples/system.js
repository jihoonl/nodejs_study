var sys = require("util"),

spawn = require("child_process").spawn;
     
var ls = spawn("ls", ["-hls", "/"]);
ls.stdout.addListener("data", function(data) {
  sys.print(data);
});

