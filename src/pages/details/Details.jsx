import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../useFetch';
import DetailsBanner from '../../components/DetailsBanner/DetailsBanner';
import Footer from '../footer/Footer';

function Details() {
  return (
    <div>
      <DetailsBanner />
    </div>
  );
}

export default Details;
