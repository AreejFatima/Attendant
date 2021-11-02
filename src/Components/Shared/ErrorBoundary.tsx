/* eslint-disable no-console */
import React from "react";

function ErrorFallbackUI(props) {
  const { errorMessage } = props;
  return (
    <div className="article-error">
      <h3>There was a problem displaying this Page:</h3>
      <h3 className="error">{errorMessage}</h3>
    </div>
  );
}

export default class ErrorBoundary extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = { error: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error) {
    return { error: true, errorMessage: error.toString() };
  }

  componentDidCatch(error, info) {
    console.log(error);
    console.log(info);
  }

  render() {
    const { error, errorMessage } = this.state;
    const { children } = this.props;

    return error ? <ErrorFallbackUI {...{ error, errorMessage }} /> : children;
  }
}
