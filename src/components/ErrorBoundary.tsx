import { Component, type ReactNode } from "react";

/** Last-resort fallback so a crash never leaves visitors with a blank page. */
export default class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error: unknown) { console.error("Site error:", error); }
  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="grid min-h-screen place-items-center bg-[#14275a] px-6 text-center text-white">
        <div>
          <h1 className="font-display text-3xl font-bold">Something went wrong</h1>
          <p className="mt-3 text-white/80">Please refresh the page, or call the school office: +977-1-5007275.</p>
          <button type="button" onClick={() => window.location.reload()} className="mt-6 rounded-full bg-[#c8302f] px-7 py-3 font-semibold">Refresh</button>
        </div>
      </div>
    );
  }
}
