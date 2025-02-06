import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };
 /**
   * Update state when an error is encountered.
   * @param error The error that was thrown.
   */
  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }
/**
   * Logs error information for debugging.
   * @param error The error that was thrown.
   * @param errorInfo Additional error information.
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI when an error is caught
      return <div className="p-4 bg-red-500 place-self-auto  ">Something went wrong.</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
