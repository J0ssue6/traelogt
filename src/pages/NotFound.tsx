import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-lg text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          Traelogt
        </p>

        <h1 className="mt-4 text-6xl font-bold tracking-tight">404</h1>

        <h2 className="mt-4 text-2xl font-semibold">Page not found</h2>

        <p className="mt-3 text-muted-foreground">
          Sorry, we couldn't find the page you're looking for.
        </p>

        <div className="mt-8 flex justify-center gap-3">
          <Link to="/">Back to home</Link>

          <Link to="/products">Shop products</Link>
        </div>
      </div>
    </main>
  );
}

export default NotFound;
