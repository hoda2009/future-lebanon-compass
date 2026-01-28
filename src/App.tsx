import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuroraBackground } from "@/components/AuroraBackground";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import HomePage from "./pages/HomePage";
import MajorsPage from "./pages/MajorsPage";
import MajorDetailPage from "./pages/MajorDetailPage";
import UniversitiesPage from "./pages/UniversitiesPage";
import UniversityDetailPage from "./pages/UniversityDetailPage";
import QuizPage from "./pages/QuizPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuroraBackground />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/majors" element={<MajorsPage />} />
                <Route path="/major/:id" element={<MajorDetailPage />} />
                <Route path="/universities" element={<UniversitiesPage />} />
                <Route path="/university/:id" element={<UniversityDetailPage />} />
                <Route path="/quiz" element={<QuizPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
