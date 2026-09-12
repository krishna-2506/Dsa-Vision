import React from 'react';
import { AlertCircle, RefreshCw, Code2 } from 'lucide-react';

export default class VisualizerErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Visualizer runtime error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full flex flex-col items-center justify-center p-8 text-center bg-[var(--board-raised)] border border-[rgba(224,108,117,0.3)] rounded-[3px] my-4 shadow-xl">
          <div className="w-12 h-12 rounded-full bg-[rgba(224,108,117,0.12)] flex items-center justify-center text-[#e06c75] mb-3">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="font-mono text-base font-semibold text-[var(--chalk)] mb-1">
            Visualizer Execution Paused
          </h3>
          <p className="text-[12.5px] text-[var(--chalk-dim)] max-w-md mb-3 font-sans">
            The visualizer component encountered an unexpected error on this step. You can reload the step, or inspect the code directly.
          </p>

          {this.state.error && (
            <div className="w-full max-w-lg bg-[var(--board)] p-3 rounded border border-[var(--line-strong)] text-left font-mono text-[11px] text-[#e06c75] overflow-x-auto mb-4">
              <code>{this.state.error.toString()}</code>
            </div>
          )}

          <div className="flex items-center gap-3">
            <button
              onClick={this.handleReset}
              className="chalk-btn chalk-btn-amber text-xs font-mono py-1.5 px-3.5 flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Step</span>
            </button>
            {this.props.onSwitchToCode && (
              <button
                onClick={this.props.onSwitchToCode}
                className="chalk-btn text-xs font-mono py-1.5 px-3.5 flex items-center gap-1.5"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>View Solution Code</span>
              </button>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
