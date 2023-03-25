import { Typography, Grid } from '@mui/material';
import { useState } from 'react';
import Axios from 'axios';
import BannerCarousel from '../components/BannerCarousel'

const home = ({results}) => {
  // const [ data, setData ] = useState('');
  // setData(results);
  return (
    <>
    <Grid justifyContent='center'>
      <BannerCarousel results={results} />
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