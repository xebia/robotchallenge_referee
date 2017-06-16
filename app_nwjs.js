var NW = require('nw.gui');
NW.require("nwjs-j5-fix").fix();
var five = require("johnny-five");
var RobotReferee = require("./robotreferee");

var $ = function (selector) {
  return document.querySelector(selector);
}

document.addEventListener('DOMContentLoaded', function() {
  NW.Window.get().focus();

  var board = new five.Board({port: '/dev/tty.Makeblock-ELETSPP'});

  var timeElement = $("#time");
  var miniElement = $("#mini");
  var debugElement = $("#debug");
  timeElement.innerHTML = 'Setting up board...';
  debugElement.innerHTML = 'Setting up debug...';

  board.on("ready", function(){
    new RobotReferee(board, timeElement, miniElement, debugElement);
  });

  board.on("error", function(err) {
    timeElement.innerHTML = 'Error' + "<br>";
  });
});