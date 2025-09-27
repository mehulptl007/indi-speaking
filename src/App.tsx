import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Reels from "./pages/Reels";
import SacredPlaces from "./pages/SacredPlaces";
import HinduGods from "./pages/HinduGods";
import GodDetail from "./pages/GodDetail";
import GodContent from "./pages/GodContent";
import Scriptures from "./pages/Scriptures";
import ScriptureDetail from "./pages/ScriptureDetail";
import ScriptureContent from "./pages/ScriptureContent";
import AboutUs from "./pages/AboutUs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/reels" element={<Reels />} />
          <Route path="/places" element={<SacredPlaces />} />
          <Route path="/gods" element={<HinduGods />} />
          <Route path="/gods/:godId" element={<GodDetail />} />
          <Route path="/gods/:godId/sections/:sectionId" element={<GodContent />} />
          <Route path="/scriptures" element={<Scriptures />} />
          <Route path="/scriptures/:scriptureId" element={<ScriptureDetail />} />
          <Route path="/scriptures/:scriptureId/sections/:sectionId" element={<ScriptureContent />} />
          <Route path="/about" element={<AboutUs />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
