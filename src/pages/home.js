import { Typography, Grid, Container, Box } from '@mui/material';
import { useState } from 'react';
import Axios from 'axios';
import BannerCarousel from '../components/BannerCarousel';
import TrendingCarousel from '../components/TrendingCarousel';

const home = ({results}) => {
  // const [ data, setData ] = useState('');
  // setData(results);
  return (
    <>
    <Grid justifyContent='center'>
      <BannerCarousel results={results} />
      <Box sx={{maxWidth: '95%', margin: 'auto'}}>
        <TrendingCarousel results={results} />
      </Box>
    </Grid>
    </>
  )
};

export const getStaticProps = async () => {
  try {
    const { data } = await Axios.get("https://api.consumet.org/meta/anilist/trending", { params: {
      page: 1,
      perPage: 20
    }});
    return {
      props: {
        results: data.results
      }
    }
  } catch (err) {
    throw new Error(err.message);
  }}

export default home