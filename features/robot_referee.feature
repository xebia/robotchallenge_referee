Feature: Follow line
  As a Test Master
  I want my robot referee to record the racetime of robots
  So that I can impartially decide which robot is the fastest

  Scenario: Robot finishes correctly
    Given a robot has started racing
    When a robot completes the track after 2 seconds
    Then I know the robot took 2 seconds to finish

  Scenario: timer can handle minutes and miniseconds
    Given a robot has started racing
    When a robot completes the track after 2 minutes 3 seconds and 356 miliseconds
    Then I know the robot took 2:03 and 350 miliseconds

  Scenario: Restart match
    Given a robot has started racing
    When a robot returns to the starting point
    Then I am ready to start another match

  Scenario: Robots starts too early
    Given a robot does not wait for the start sign
    When a robot completes the track after 2 seconds
    Then the robot will not be allowed to finish