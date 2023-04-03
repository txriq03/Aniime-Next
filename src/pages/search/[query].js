import { useQuery } from 'react-query';
import { api } from '../../utils';
import AnimeModal from '../../components/Modal';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Typography, Grid, Box, Card, CardMedia, Paper } from '@mui/material';
import styles from '../../styles/TrendingCarousel.module.css';
import { Theaters } from '@mui/icons-material';

const Search = () => {
    const router = useRouter();
    const { query } = router.query;
    const { data, status } = useQuery(['searchQuery'], () => api.searchQuery(query))
    console.log(data)
  
    const [ animeid, setAnimeId ] = useState(null);
    const [ isModalopen, setIsModalOpen ] = useState(false);

    const chooseTitle= (english, romaji) => {
      if (english != null) {
      return english
      } else {
      return romaji
      }
    }

    const changeRatingColor = (rating) => {
      if (rating < 40) {
          return 'red'
      } else if (rating >= 70) {
        return 'lightgreen'
      } else {
          return 'orange'
      }
    }
    
  return (
    <>
      {status === 'loading' ? 
        <Typography color='white' variant='h3' ml={10}>Loading...</Typography> :
        <Typography color='white' variant='h3' ml={10}>Results</Typography>
      }

    <Box display='flex' flexDirection='row' flexWrap='wrap' ml={10}>
      {data?.results.map(anime => (

          <Card key={anime.id} sx={{mr: 2, mt: 1, mb: 5, cursor: 'pointer'}} onClick={() => {
            setAnimeId(anime.id); 
            setIsModalOpen(true)
            }}>
          <div style={{position: 'relative'}}>
              <CardMedia  component='img' image={anime.image} sx={{ 
                      borderRadius: 2, boxShadow: 5,  height: '280px', width: '176px', objectFit: 'cover', cursor: 'pointer'
                  }}/>
              <Box className={styles.cardBox} position='absolute'  height='100%' width='100%' sx={{bottom: 0}}/>
              <Paper sx={{display: 'flex', justifyContent: 'center' ,position: 'absolute', bottom: 70, right: 5, width: '3.5rem', height: '1.3rem', bgcolor: '#BD284D'}}>
                  
                  {anime.totalEpisodes ?
                  <>
                      <Theaters style={{fontSize: '1rem', marginTop: 1}}/> 
                      <Typography fontFamily='Nunito' fontSize='0.8rem' align='center'> 
                      {anime.totalEpisodes} 
                      </Typography> 
                  </> :
                  <Typography fontFamily='Nunito' fontSize='0.8rem' align='center'>
                  ???
                  </Typography>}
              </Paper>
              <Box sx={{ position: 'absolute',  zIndex: 2, width: '90%', mx: 1, top: '80%', textOverflow: 'ellipsis'}}>
                  <Typography fontFamily='Nunito' style={{
                  display: '-webkit-box', 
                  WebkitBoxOrient: 'vertical', 
                  overflow: 'hidden',
                  lineHeight: 1.1,   
                  WebkitLineClamp: 2}}>{chooseTitle(anime.title.english, anime.title.romaji)}
                  </Typography>
              </Box>
              <Paper sx={{bgcolor: '#0E0E0E', position: 'absolute', bottom: 70, left: 5, width: '3rem', height: '1.3rem'}}>
                {anime.releaseDate != null ? 
                  <Typography color='#BD284D' fontSize='0.8rem' align='center' >{anime.releaseDate}</Typography> :
                  <Typography color='#BD284D' fontSize='0.8rem' align='center'>N/A</Typography>}
              </Paper>       


              <Box display='flex' mx={1} sx={{position: 'absolute', bottom: 5}}>
                  <Typography noWrap fontSize='0.7rem' fontFamily='Nunito' mx={0.5}>{anime.type}</Typography>
                  <Typography noWrap fontSize='0.7rem' fontFamily='Nunito' mx={0.5}>•</Typography>
                  <Typography noWrap fontSize='0.7rem' fontFamily='Nunito' mx={0.5}>{anime.genres[0]}</Typography>
                  <Typography noWrap fontSize='0.7rem' fontFamily='Nunito' mx={0.5}>•</Typography>
                  <Typography noWrap color={changeRatingColor(anime.rating)} fontSize='0.7rem' fontFamily='Nunito' mx={0.5}>{anime.rating}%</Typography>
              </Box>
          </div>

          </Card>
      ))}
      </Box>
    </>
  )
}

export default Search