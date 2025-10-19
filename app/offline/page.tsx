export default function OfflinePage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-foreground mb-4">You're Offline</h1>
        <p className="text-lg text-muted-foreground mb-8">
          It looks like you've lost your internet connection. Some features may not be available.
        </p>
        <p className="text-sm text-muted-foreground">
          Don't worry! Your data is safely cached. Try refreshing the page when you're back online.
        </p>
      </div>
    </main>
  )
}
