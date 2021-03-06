const React = require('react');
const axios = require('axios');
const Timer = require('Timer.jsx');
const Button = require('Button.jsx');
const StartButton = require('StartButton.jsx');
const Sound = require('Sound.jsx');
const {connect} = require('react-redux');
const {addLog} = require('./flow/log.js');
const timerSound = require('../timerSound.wav');

class TimerWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {timeLeft: null, timeFrom: null, timer: null, paused: false};
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.resume = this.resume.bind(this);
    this.cancel = this.cancel.bind(this);
    this.reset = this.reset.bind(this);
    this.addLog = this.addLog.bind(this);
  }

  addLog(data) {
    const query =`mutation {
      create(text:"${data}") {text}
    }`;

    axios({
      method: 'post',
      url: '/graphql?',
      data: {
        query
      }
    }).then(response => {
      this.props.addLog(data);
    });
  }

  start(timeLeft) {
    this.addLog(`Timer has been started at ${Date.now()}`);
    clearInterval(this.state.timer);
    let timer = setInterval(() => {
      var timeLeft = this.state.timeLeft - 1;
      if (timeLeft == 0) {
        clearInterval(timer);
      }
      this.setState({timeLeft: timeLeft});
    }, 1000)
    return this.setState({timeLeft: timeLeft, timeFrom: timeLeft, timer: timer});
  }

  pause() {
    if(this.state.timeLeft > 0 && !this.state.paused) {
      this.addLog(`Timer has been paused at ${Date.now()}`);
      this.setState({paused: true});
      clearInterval(this.state.timer);
    }
  }

  resume() {
    if(this.state.paused && this.state.timeLeft > 0) {
      this.addLog(`Timer has been resumed at ${Date.now()}`);
      this.setState({paused: false});
      this.start(this.state.timeLeft);
    }
  }

  cancel() {
    if(this.state.timeLeft > 0) {
      this.addLog(`Timer has been canceled at ${Date.now()}`);
      this.setState({
        timeLeft: null,
        paused: false
      });
      clearInterval(this.state.timer);
    }
  }

  reset() {
    if(this.state.timeLeft > 0) {
      this.setState({timeLeft:this.state.timeFrom});
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  render() {
    console.log('render');
    return (
      <div className="row-fluid">
        <h2>Timer</h2>
        <div className="btn-group" role="group">
          <StartButton time={5} startTimer={this.start}/>
          <StartButton time={10} startTimer={this.start}/>
          <StartButton time={15} startTimer={this.start}/>
        </div>
        <div>
          <div className="btn-group" role="group">
            <Button labelText="Pause" apply={this.pause} disabled={this.state.paused}/>
            <Button labelText="Resume" apply={this.resume} disabled={!this.state.paused}/>
            <Button labelText="Cancel" apply={this.cancel}/>
            <Button labelText="Reset" apply={this.reset}/>
          </div>
        </div>
        <Timer timeLeft={this.state.timeLeft} loading={!this.state.paused}/>
        <Sound file={timerSound}/>
      </div>
    )
  }
}

module.exports = connect(null, {
  addLog
})(TimerWrapper);
