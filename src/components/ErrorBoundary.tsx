import { Component, type ErrorInfo, type ReactNode } from "react";


interface Props {
  fallback?: ReactNode;
  children: ReactNode;
  title?: string;
  message?: string;
  onError?: (error: Error, info: ErrorInfo) => void; 
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("🚨 Uncaught error:", error, errorInfo);
    this.props.onError?.(error, errorInfo); 
  }

  private handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    const { hasError } = this.state;
    const { fallback, title, message, children } = this.props;

    if (hasError) {
      if (fallback) return fallback;

      return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-red-50 text-center p-6">
          <div className="bg-white shadow-lg rounded-lg px-8 py-6 max-w-md w-full animate-fade-in">
            <div className="text-5xl mb-4">💥</div>
            <h2 className="text-2xl font-bold text-red-600 mb-2">
              {title ?? "Something went wrong"}
            </h2>
            <p className="text-gray-700 mb-6">
              {message ?? "Please try again or reload the page."}
            </p>

            <button
              onClick={this.handleReset}
              className="px-5 py-2 bg-yellow-400 text-white font-medium rounded-lg hover:bg-yellow-500 transition-colors duration-200"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    return children;
  }
}
