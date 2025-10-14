import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center gradient-hero">
      <div className="text-center px-6">
        <h1 className="mb-6 text-8xl font-bold text-white">404</h1>
        <p className="mb-8 text-2xl text-white/90">Oops! Page not found</p>
        <a href="/" className="inline-block px-8 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-all border border-white/30">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
