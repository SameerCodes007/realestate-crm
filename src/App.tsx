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
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/*"
          element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/property-resale" element={<PropertyResale />} />
                  <Route path="/new-properties" element={<NewProperties />} />
                  <Route path="/rental-properties" element={<RentalProperties />} />
                  <Route path="/gated-plots" element={<GatedPlots />} />
                  <Route path="/construction" element={<Construction />} />
                  <Route path="/interior-design" element={<InteriorDesign />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/property/:id" element={<PropertyDetails />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </main>
              <Footer />
            </div>
          }
        />
        
        {/* Dashboard Routes */}
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;