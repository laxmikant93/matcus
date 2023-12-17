import React, { Component } from 'react';
import AppLink from '../Common/AppLink';

class ErrorBoundary extends Component {

  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      errorMessage: ""
    }
  }

  static getDerivedStateFromError(error) {
    return {
      errorMessage: error,
      hasError: true
    }
  }

  componentDidCatch(error) {
    if (this.state.hasError) {
      this.setState({ errorMessage: error })
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <React.Fragment>
          <div className="ErrorBoundaryWrapper">
            <span className="ErrorBoundaryIcon mb-10">
              <i className="ed-icon icon-break-link bsPink i-65"></i>
            </span>
            <p className="text-sm bsPink">Something went wrong</p>
            <p className="text-xs mt-3">Please try again after sometime or</p>
            <AppLink to={this.props.url} className="button btn-sm button-theme mt-40">Go Back</AppLink>
          </div>
        </React.Fragment>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary;