import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    toast.error('A apărut o eroare neașteptată');
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-4 text-center">
          <h1 className="text-2xl font-bold">Oops! Ceva nu a mers bine</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Ne pare rău, dar a apărut o eroare neașteptată.
          </p>
          {this.state.error && (
            <pre className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm overflow-auto max-w-full">
              {this.state.error.toString()}
            </pre>
          )}
          <Button onClick={this.handleReset} variant="default">
            Reîncarcă Pagina
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
