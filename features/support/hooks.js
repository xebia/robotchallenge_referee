var myHooks = function () {
  this.Before(function (scenario) {
    var RobotReferee = require("../../robotreferee");
    var timeElement = this.sinon.stub();
    timeElement.style = function() {};
    var miniElement = this.sinon.stub();
    var debugElement = this.sinon.stub();

    this.RobotReferee = new RobotReferee(this.board, timeElement, miniElement, debugElement);

    //specifying spies that are used in multiple specs
    this.readySpy = this.sandbox.spy(this.RobotReferee, "ready");
    this.raceSpy = this.sandbox.spy(this.RobotReferee, "race");
    this.finishSpy = this.sandbox.spy(this.RobotReferee, "finish");
  });

  this.After(function (scenario) {
    this.sandbox.restore();
  })
};

module.exports = myHooks;
