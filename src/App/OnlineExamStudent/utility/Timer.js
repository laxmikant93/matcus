import React, { Component } from 'react'
import { connect } from "react-redux";

const withTimer = (WrappedComponent) => {
  class Timer extends Component {
    constructor(props) {
      super(props);
      this.timer = 0;
      this.state = { time: {}, seconds: props.currentTime };
      this.startTimer = this.startTimer.bind(this);
      this.countDown = this.countDown.bind(this);
    }


    componentDidMount() {
      let timeLeftVar = this.timeCalculation(this.state.seconds);
      this.setState({ time: timeLeftVar });
      this.startTimer()
    }

    timeCalculation(secs) {
      return {
        "minutes": this.getMinuteCounter(secs),
        "seconds": this.getSecondCounter(secs)
      };
    }


    getMinuteCounter(secs) {
      return String(Math.floor(secs / 60)).length === 1
        ? `0${Math.floor(secs / 60)}`
        : Math.floor(secs / 60);
    }


    getSecondCounter(secs) {
      return String(secs % 60).length === 1
        ? `0${secs % 60}`
        : secs % 60;
    }


    startTimer() {
      if (this.timer === 0 && this.state.seconds > 0) {
        this.timer = setInterval(this.countDown, 1000);
      }
    }

    countDown() {
      let seconds = this.state.seconds - 1;
      this.setState({
        time: this.timeCalculation(seconds),
        seconds: seconds,
      });
      if (seconds === 0) {
        clearInterval(this.timer);
      }
    }

    render() {
      return <WrappedComponent
        counter={this.state.seconds}
        minutes={this.state.time.minutes}
        seconds={this.state.time.seconds}
      />
    }
  }

  const mapStateToProps = state => ({
    currentTime: state.onlineexamstudent.detail.currentTime,
    warningTimer: state.onlineexamstudent.detail.warningTimer
  })

  return connect(mapStateToProps)(Timer)

}

export default withTimer