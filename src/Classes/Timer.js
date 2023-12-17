import { Component } from "react";

class Timer extends Component {

  constructor(counter) {
    super()
    this.counter = counter
    this.state = {
      second: 0,
      minute: 0
    }
  }


  componentDidMount() {
    let intervalId;
    intervalId = setInterval(() => {
      const secondCounter = this.state.counter % 60;
      const minuteCounter = Math.floor(this.state.counter / 60);
      const computedSecond =
        String(secondCounter).length === 1
          ? `0${secondCounter}`
          : secondCounter;
      const computedMinute =
        String(minuteCounter).length === 1
          ? `0${minuteCounter}`
          : minuteCounter;
      this.setState({ second: computedSecond });
      this.setState({ minute: computedMinute });
      this.setState({ counter: (counter) => counter - 1 });
    }, 1000);
    return () => clearInterval(intervalId);
  }

  getValues() {
    return this.counter
  }

}

export default Timer;