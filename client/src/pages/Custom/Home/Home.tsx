import React from 'react';
import Hero from '../../../components/Hero/Hero';
import Populer from '../../../components/Populer/Populer';
import Offers from '../../../components/Offers/Offer';
import NewCollection from '../../../components/NewCollection/NewCollection';
import NewsLetter from '../../../components/NewsLetter/NewsLetter';

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <Populer />
      <Offers />
      <NewCollection />
      <NewsLetter />
    </div>
  );
};

export default Home;
