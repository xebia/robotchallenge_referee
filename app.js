var five = require("johnny-five");
var board = new five.Board({port: '/dev/tty.Makeblock-ELETSPP'});
var RobotReferee = require("./robotreferee");


board.on("ready", function(){
    new RobotReferee(board);
});