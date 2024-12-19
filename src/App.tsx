import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import PropertyResale from './pages/PropertyResale';
import NewProperties from './pages/NewProperties';
import RentalProperties from './pages/RentalProperties';
import GatedPlots from './pages/GatedPlots';
import Construction from './pages/Construction';
import InteriorDesign from './pages/InteriorDesign';
import Contact from './pages/Contact';
import PropertyDetails from './pages/PropertyDetails';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/property-resale" element={<PropertyResale />} />
            <Route path="/new-properties" element={<NewProperties />} />
            <Route path="/rental-properties" element={<RentalProperties />} />
            <Route path="/gated-plots" element={<GatedPlots />} />
            <Route path="/construction" element={<Construction />} />
            <Route path="/interior-design" element={<InteriorDesign />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;