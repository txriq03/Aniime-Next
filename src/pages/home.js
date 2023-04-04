import {  Grid, Box } from '@mui/material';
import { useState } from 'react';
import BannerCarousel from '../components/BannerCarousel';
import TrendingCarousel from '../components/TrendingCarousel';
import AnimeModal from '../components/Modal';
import Head from 'next/head';
import { useQuery } from '@tanstack/react-query';
import { api } from '../utils';

const Home = () => {
  const [ animeId, setAnimeId ] = useState(null);
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const { data, status } = useQuery(['TrendingData'], () => api.getTrending(1, 10));

  console.log(data)

  return (
    <>
    <Head>
      <title>Aniime - Home</title>
    </Head>
    <Grid justifyContent='center'>
      <BannerCarousel results={data} setIsModalOpen={setIsModalOpen} />
      <Box sx={{maxWidth: '95%', margin: 'auto'}}>
        <TrendingCarousel results={data} animeId={animeId} setAnimeId={setAnimeId} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </Box>
    </Grid>
    <AnimeModal animeId={animeId} setAnimeId={setAnimeId} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  )
};

// export const getServerSideProps = async () => {
//   try {
//     const { data } = await Axios.get(`${process.env.NEXT_PUBLIC_API_URL}/meta/anilist/trending`, { params: {
//       page: 1,
//       perPage: 20
//     }});
    
//     return {
//       props: {
//         trendingResults: data.results
//       }
//     }
//   } catch (err) {
//     throw new Error(err.message);
//   }}

export default Home