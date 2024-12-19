import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import FeaturedProperties from '../components/FeaturedProperties';
import DeveloperShowcase from '../components/DeveloperShowcase';
import LeadForm from '../components/LeadForm';
import TeamShowcase from '../components/TeamShowcase';
import Awards from '../components/Awards';

const Home = () => {
  return (
    <div>
      <Hero />
      <Services />
      <FeaturedProperties />
      <DeveloperShowcase />
      <LeadForm />
      <Awards />
      <TeamShowcase />
    </div>
  );
};

export default Home;