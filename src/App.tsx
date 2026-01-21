// src/App.tsx
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import ScrollToTop from "./components/ScrollToTop"; // Logic: Auto-scroll on route change
import BackToTopButton from "./components/BackToTopButton"; // UI: Rocket Button (Add this import)
import SchedulePage from "./components/pages/SchedulePage";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const EventDetails = lazy(() => import("./components/pages/EventDetails"));
const GalleryDetails = lazy(() => import("./components/pages/GalleryDetails"));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      <div
        className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-accent rounded-full animate-spin"
        style={{ animationDirection: "reverse", animationDuration: "1s" }}
      />
    </div>
  </div>
);

// Configure React Query with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            {/* 1. Logic: Resets scroll position when route changes */}
            <ScrollToTop />

            {/* 2. UI: The manual 'Rocket' button (Visible on all pages) */}
            <BackToTopButton />

            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/events/:eventId" element={<EventDetails />} />
                <Route path="/gallery/:year" element={<GalleryDetails />} />
                <Route path="/schedule" element={<SchedulePage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
