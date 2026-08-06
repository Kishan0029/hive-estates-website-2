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
import { PostPropertyPage } from "./pages/PostPropertyPage";
import { PageTransition } from "./components/PageTransition";

// Admin pages
import { AdminLayout } from "./pages/admin/AdminLayout";
import { AdminLoginPage } from "./pages/admin/AdminLoginPage";
import { AdminDashboardPage } from "./pages/admin/AdminDashboardPage";
import { AdminPropertiesPage } from "./pages/admin/AdminPropertiesPage";
import { AdminNewPropertyPage } from "./pages/admin/AdminNewPropertyPage";
import { AdminEditPropertyPage } from "./pages/admin/AdminEditPropertyPage";
import { AdminInquiriesPage } from "./pages/admin/AdminInquiriesPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PublicLayout() {
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
          <Route path="/post-property" element={<PostPropertyPage />} />
          <Route path="/property/:slug" element={<PropertyDetailPage />} />
        </Routes>
      </PageTransition>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Admin section — no public navbar/footer */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="properties" element={<AdminPropertiesPage />} />
          <Route path="properties/new" element={<AdminNewPropertyPage />} />
          <Route path="properties/:id/edit" element={<AdminEditPropertyPage />} />
          <Route path="inquiries" element={<AdminInquiriesPage />} />
        </Route>

        {/* Public site with navbar + footer */}
        <Route
          path="/*"
          element={
            <div className="bg-white text-hive-ink antialiased min-h-screen flex flex-col">
              <Navbar />
              <PublicLayout />
              <Footer />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
