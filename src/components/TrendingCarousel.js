import { Box, Typography, Card, CardMedia, Backdrop, Paper } from '@mui/material';
import { utils } from '../utils';
import {  useState, useEffect } from 'react';
import { Carousel } from '@mantine/carousel';
import { Theaters} from '@mui/icons-material';
import styles from '../styles/TrendingCarousel.module.css'
import Image from 'next/image';

const TrendingCarousel = ({results, isModalOpen, setIsModalOpen, animeId, setAnimeId}) => {
  return (
    <>
    <Typography variant='h3' fontFamily='Nunito' fontWeight='bold' color='white' sx={{
            mt: 2, fontSize: { lg: '2rem', md: '1.8rem', sm: '1.5rem', xs: '1.5rem'
        }}}>Trending</Typography>
    <Carousel mx='auto'  draggable align='start' slideSize={1} slidesToScroll={3} dragFree >
        {results?.map(anime => (
            <Carousel.Slide key={anime.id}>
                <Box className={styles.items} >
                    <Card sx={{mr: 2, mt: 1, mb: 5, cursor: 'pointer'}} onClick={() => {
                    setAnimeId(anime.id); 
                    setIsModalOpen(true)
                    }}>
                    <div style={{position: 'relative'}}>
                        {/* <CardMedia className={styles.cardImage} component='img' image={anime.image} sx={{ 
                            borderRadius: 2, boxShadow: 5,  height: '280px', width: '176px', objectFit: 'cover', cursor: 'pointer'
                        }}/> */}

                        {/* This image component might not work in Vercel */}
                        <Image src={anime.image} className={styles.cardImage} width={176} height={280} style={{objectFit: 'cover'}} alt={utils.chooseTitle(anime.title.english, anime.title.romaji)}/>
                        <Box className={styles.cardBox} position='absolute'  height='100%' width='100%' sx={{bottom: 0}}/>
                        <Paper sx={{display: 'flex', justifyContent: 'center' ,position: 'absolute', bottom: 70, right: 5, height: '1.3rem', bgcolor: '#BD284D'}}>
                            
                            {anime.totalEpisodes ?
                            <>
                                <Theaters style={{fontSize: '1rem', marginTop: 1, marginLeft: 5}}/> 
                                <Typography fontFamily='Nunito' fontSize='0.8rem' align='center' mr={1}> 
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
                            WebkitLineClamp: 2}}>{utils.chooseTitle(anime.title.english, anime.title.romaji)}
                            </Typography>
                        </Box>
                        <Paper sx={{bgcolor: '#0E0E0E', position: 'absolute', bottom: 70, left: 5, width: '3rem', height: '1.3rem'}}>
                            <Typography color='#BD284D' fontSize='0.8rem' align='center' >{anime.releaseDate}</Typography>
                        </Paper>       


                        <Box display='flex' mx={1} sx={{position: 'absolute', bottom: 5}}>
                            <Typography noWrap fontSize='0.7rem' fontFamily='Nunito' mx={0.5}>{anime.type}</Typography>
                            <Typography noWrap fontSize='0.7rem' fontFamily='Nunito' mx={0.5}>•</Typography>
                            <Typography noWrap fontSize='0.7rem' fontFamily='Nunito' mx={0.5}>{anime.genres[0]}</Typography>
                            <Typography noWrap fontSize='0.7rem' fontFamily='Nunito' mx={0.5}>•</Typography>
                            <Typography noWrap color={utils.changeRatingColor(anime.rating)} fontSize='0.7rem' fontFamily='Nunito' mx={0.5}>{anime.rating}%</Typography>
                        </Box>
                    </div>

                    </Card>
                </Box>
            </Carousel.Slide>
        ))}
    </Carousel>
    </>

  )
}

export default TrendingCarousel