var five = require("johnny-five");
var mbot = require("./mbotlayout");
const minRange = 10;
const maxRange = 20;

function RobotReferee(board) {
    this.start_sensor = new five.Proximity(mbot.PROXIMITY_SENSOR_START);
    this.finish_sensor = new five.Proximity(mbot.PROXIMITY_SENSOR_FINISH);
    this.waitForIt = undefined;
    this.readyState = false;
    this.raceTimer = undefined;
    this.seconds = 0;
    this.startTime;
    this.specificTime;
    var robotReferee = this;

    this.start_sensor.on("change", function() {
        robotReferee.startSensorChange(this["cm"]);
    });

    this.finish_sensor.on("change", function() {
        robotReferee.finishSensorChange(this["cm"]);
    });

    this.startSensorChange = function(value) {
        if (between(value, minRange, maxRange)) {
            if (!this.waitForIt) {
                console.log('found something at ' + value + 'cm.');
                this.waitForIt = setTimeout(function() { 
                    robotReferee.ready();
                }, 2000);
            } 
        } else {
            if (this.waitForIt) {
                clearTimeout(this.waitForIt);
                this.waitForIt = undefined;
            }
            if (this.readyState) {
                this.race();
            }
        }
    };
    this.finishSensorChange = function(value) {
        if (between(value, minRange, maxRange)) {
            if (this.raceTimer) {
                this.finish();
            }
        }
    };
    this.ready = function() {
        if (this.raceTimer) {
            clearInterval(this.raceTimer);
            this.raceTimer = undefined;
        }
        this.readyState = true;
        console.log("READY!");
    };
    this.race = function() {
        console.log("go!");
        if (!this.raceTimer) {
            this.startTime = new Date();
            this.raceTimer = setInterval(function() {
                var currentTime = new Date();
                robotReferee.seconds = (currentTime.getTime() - robotReferee.startTime.getTime())/1000;
                robotReferee.updateTimer();
                
            },25);
        }
        this.readyState = false;
    }
    this.finish = function() {
        if (this.raceTimer) {
            clearInterval(this.raceTimer);
            this.raceTimer = undefined;
        }
    };
    this.updateTimer = function() {
        var secondsFloored = Math.floor(robotReferee.seconds);
        var minutes = Math.floor(secondsFloored/60);
        var miniseconds = Math.round(robotReferee.seconds % Math.floor(robotReferee.seconds) * 1000);

        var secondsWithFrontNull = (secondsFloored - (minutes * 60)) < 10 ? '0' + (secondsFloored - (minutes * 60)) :
            (secondsFloored - (minutes * 60));
        var miniseconds =   
            !miniseconds? ':000' :
            miniseconds < 10? ':00' + miniseconds :
            miniseconds < 100? ':0' + miniseconds :
            ':' + miniseconds ;

        this.specificTime = minutes + ':' + secondsWithFrontNull + miniseconds
        console.log(this.specificTime);
    }
}


function between(x, min, max) {
    return x >= min && x <= max;
}



module.exports = RobotReferee;