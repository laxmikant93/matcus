import React, { Component } from 'react'
import { connect } from "react-redux";

const withWarningTimer = (WrappedComponent) => {
  class Timer extends Component {
    constructor(props) {
      super(props);
      this.state = { seconds: props.warningTimer };
      this.startTimer = this.startTimer.bind(this);
      this.countDown = this.countDown.bind(this);
    }

    componentDidMount() {
      this.startTimer()
    }

    startTimer() {
      if (this.state.seconds > 0) {
        this.timer = setInterval(this.countDown, 1000);
      }
    }

    countDown() {
      let seconds = this.state.seconds - 1;
      this.setState({ seconds: seconds });
      if (seconds === 0) {
        clearInterval(this.timer);
      }
    }

    render() {
      return <WrappedComponent
        counter={this.state.seconds}
        {...this.props}
      />
    }
  }

  const mapStateToProps = state => ({
    warningTimer: state.onlineexamstudent.detail.warningTimer
  })

  return connect(mapStateToProps)(Timer)

}

export default withWarningTimer