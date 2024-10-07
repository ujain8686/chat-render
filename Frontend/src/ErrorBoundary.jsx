import React, { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  //   static getDerivedStateFromError(error) {
  //     console.log(error, "errorororor");

  //     return { error: error };
  //   }

  componentDidCatch(error, errorInfo) {
    this.setState({ error: error });
    console.log(error, errorInfo, "loggg");
  }

  render() {
    if (this.state.error != null) {
      return <h1> Something Went Wrong </h1>;
    }

    return this.props.children;
  }
}
