import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";
import About from "./pages/About";
import Home from "./pages/Home";
import List from "./pages/List";
import MangaDetail from "./pages/MangaDetail";
import Favorites from "./pages/Favorites";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Ranking from "./pages/Ranking";
import Terms from "./pages/Terms";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <div className="pt-[104px] sm:pt-[60px] min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trend" element={<Navigate to="/" replace />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/search" element={<List />} />
          <Route path="/manga/:id" element={<MangaDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}
