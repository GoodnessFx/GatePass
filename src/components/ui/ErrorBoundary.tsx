import * as React from "react"

type Props = { children: React.ReactNode }

type State = { hasError: boolean; error?: unknown }

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: unknown): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: unknown, info: unknown) {
    console.error("ErrorBoundary caught:", error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex-1 flex items-center justify-center min-h-[40vh] p-6">
          <div className="max-w-md text-center space-y-3">
            <h2 className="text-xl font-semibold">We couldn’t load this section</h2>
            <p className="text-sm text-muted-foreground">
              Please refresh the page or try again later.
            </p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
