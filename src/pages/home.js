import { Typography, Grid, Container, Box, ClickAwayListener } from '@mui/material';
import { useState } from 'react';
import Axios from 'axios';
import BannerCarousel from '../components/BannerCarousel';
import TrendingCarousel from '../components/TrendingCarousel';
import AnimeModal from '../components/Modal';

const home = ({trendingResults}) => {
  const [ animeId, setAnimeId ] = useState(136430);
  const [ isModalOpen, setIsModalOpen ] = useState(false);

  return (
    <>
    <Grid justifyContent='center'>
      <BannerCarousel results={trendingResults} animeId={animeId} setAnimeId={setAnimeId} setIsModalOpen={setIsModalOpen} />
      <Box sx={{maxWidth: '95%', margin: 'auto'}}>
        <TrendingCarousel results={trendingResults} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </Box>
    </Grid>
    <AnimeModal animeId={animeId} setAnimeId={setAnimeId} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  )
};

export const getServerSideProps = async () => {
  try {
    const { data } = await Axios.get("https://api.consumet.org/meta/anilist/trending", { params: {
      page: 1,
      perPage: 20
    }});

    return {
      props: {
        trendingResults: data.results
      },
    }
  } catch (err) {
    throw new Error(err.message);
  }}

export default home