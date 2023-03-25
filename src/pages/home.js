import { Typography, Grid, Container, Box } from '@mui/material';
import { useState } from 'react';
import Axios from 'axios';
import BannerCarousel from '../components/BannerCarousel';
import TrendingCarousel from '../components/TrendingCarousel';

const home = ({trendingResults}) => {
  // const [ data, setData ] = useState('');
  // setData(results);
  return (
    <>
    <Grid justifyContent='center'>
      <BannerCarousel results={trendingResults} />
      <Box sx={{maxWidth: '95%', margin: 'auto'}}>
        <TrendingCarousel results={trendingResults} />
      </Box>
    </Grid>
    </>
  )
};

export const getStaticProps = async () => {
  try {
    const { data: trendingData } = await Axios.get("https://api.consumet.org/meta/anilist/trending", { params: {
      page: 1,
      perPage: 20
    }});
    const { data: recentlyUpdatedData } = await Axios.get("https://api.consumet.org/meta/anilist/recent-episodes")

    return {
      props: {
        trendingResults: trendingData.results,
        recentlyUpdatedResults: recentlyUpdatedData.results
      },
      revalidate: 60,
    }
  } catch (err) {
    throw new Error(err.message);
  }}

export default home