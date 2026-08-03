import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { ApartmentsPage } from "./pages/ApartmentsPage";
import { LandPage } from "./pages/LandPage";
import { ContactPage } from "./pages/ContactPage";
import { AboutPage } from "./pages/AboutPage";
import { PropertyDetailPage } from "./pages/PropertyDetailPage";
import { PageTransition } from "./components/PageTransition";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function MainContent() {
  const location = useLocation();
  return (
    <div className="flex-1 w-full relative">
      <PageTransition key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/apartments" element={<ApartmentsPage />} />
          <Route path="/land" element={<LandPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/property/:id" element={<PropertyDetailPage />} />
        </Routes>
      </PageTransition>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="bg-white text-hive-ink antialiased min-h-screen flex flex-col">
        <Navbar />
        <MainContent />
        <Footer />
      </div>
    </BrowserRouter>
  );
}
