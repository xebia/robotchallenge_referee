var assert = require("chai").assert;

module.exports = function() {
  this.Given(/^a robot has started racing$/, function (done) {
    this.RobotReferee.startSensorChange(15);
    this.clock.tick(2000);
    assert(this.readySpy.calledOnce, "robot is not ready");
    this.RobotReferee.startSensorChange(5);
    assert(this.raceSpy.calledOnce, "robot is not racing");
    done();
  });
  this.Given(/^a robot does not wait for the start sign$/, function (done) {
    this.RobotReferee.startSensorChange(15);
    this.RobotReferee.startSensorChange(5);
    done();
  });
  this.When(/^a robot completes the track after (\d+) seconds$/, function (seconds, done) {
    this.clock.tick(seconds*1000);
    this.RobotReferee.finishSensorChange(15);
    done();
  });
  this.When(/^a robot returns to the starting point$/, function (done) {
    this.RobotReferee.startSensorChange(15);
    this.clock.tick(2000);
    done();
  });
  this.When(/^a robot completes the track after (\d+) minutes (\d+) seconds and (\d+) miliseconds$/, function (minutes, seconds, miliseconds, done) {
    var time = (minutes * 60000) + (seconds * 1000) + (miliseconds*1);
    this.clock.tick(time);
    this.RobotReferee.finishSensorChange(15);
    done();
  });
  this.Then(/^I know the robot took (\d+) seconds to finish$/, function (seconds, done) {
    assert(this.finishSpy.calledOnce, "robot has not finished");
    assert.equal(this.RobotReferee.seconds, seconds, 'incorrect amount of seconds stored, expected ' + seconds + 'seconds')
    done();
  });
  this.Then(/^I am ready to start another match$/, function (done) {
    assert.equal(this.readySpy.callCount, 2, "robot is not ready");
    done();
  });
  this.Then(/^the robot will not be allowed to finish$/, function (done) {
    assert.equal(this.finishSpy.callCount, 0, "robot did incorrectly finish");
    assert.equal(this.RobotReferee.seconds, 0, 'a score was incorrectly given')
    done();
  });
  this.Then(/^I know the robot took (\d+):(\d+) and (\d+) miliseconds$/, function (minutes, seconds, miliseconds, done) {
    console.log('timetext: ' + this.RobotReferee.timeElement.innerHTML);
    console.log('militext: ' + this.RobotReferee.miniElement.innerHTML);
    assert.equal(this.RobotReferee.timeElement.innerHTML, minutes + ':' + seconds, 'shown time does not match expected time');
    assert.equal(this.RobotReferee.miniElement.innerHTML, ':' + miliseconds, 'shown miliseconds does not match expected time');
    done();
  });
}
