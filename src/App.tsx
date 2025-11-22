import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Medicine from "./pages/features/Medicine";
import Ambulance from "./pages/features/Ambulance";
import Queues from "./pages/features/Queues";
import Schemes from "./pages/features/Schemes";
import Disaster from "./pages/features/Disaster";
import Community from "./pages/features/Community";
import Wellness from "./pages/Wellness";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/features/medicine" element={<Medicine />} />
              <Route path="/features/ambulance" element={<Ambulance />} />
              <Route path="/features/queues" element={<Queues />} />
              <Route path="/features/schemes" element={<Schemes />} />
              <Route path="/features/disaster" element={<Disaster />} />
              <Route path="/features/community" element={<Community />} />
              <Route path="/wellness" element={<Wellness />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
