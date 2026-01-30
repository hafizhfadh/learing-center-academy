import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

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
    }

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="flex items-center justify-center min-h-[400px] p-4">
                    <Card className="w-full max-w-md border-destructive/50">
                        <CardHeader className="text-center">
                            <div className="mx-auto bg-destructive/10 p-3 rounded-full mb-4 w-fit">
                                <AlertTriangle className="h-8 w-8 text-destructive" />
                            </div>
                            <CardTitle className="text-xl text-destructive">Something went wrong</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center text-muted-foreground">
                            <p>We encountered an unexpected error while loading this component.</p>
                            {this.state.error && (
                                <p className="mt-2 text-xs bg-muted p-2 rounded text-left overflow-auto max-h-32">
                                    {this.state.error.message}
                                </p>
                            )}
                        </CardContent>
                        <CardFooter className="justify-center">
                            <Button 
                                variant="outline" 
                                onClick={() => this.setState({ hasError: false })}
                            >
                                Try Again
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            );
        }

        return this.props.children;
    }
}
