import { Box, Typography, Card, CardMedia, Backdrop, Paper } from '@mui/material';
import { utils } from '../utils';
import {  useState, useEffect } from 'react';
import { Carousel } from '@mantine/carousel';
import { Theaters} from '@mui/icons-material';
import styles from '../styles/TrendingCarousel.module.css'
import Image from 'next/image';

const RecentlyUpdatedCarousel = ({results, animeId, setAnimeId, isModalOpen, setIsModalOpen}) => {
  return (
    <>
    <Typography variant='h3' fontFamily='Nunito' fontWeight='bold' color='white' sx={{
            mt: 1, fontSize: { lg: '2rem', md: '1.8rem', sm: '1.5rem', xs: '1.5rem'
        }}}>Recently Updated</Typography>
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
                            <Typography mx={1} fontFamily='Youtube Sans' color='whitesmoke' fontSize='0.8rem' align='center'>
                            Ep {anime.episodeNumber}
                            </Typography>
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
     


                        <Box display='flex' mx={1} sx={{position: 'absolute', bottom: 5}}>
                            <Typography noWrap fontSize='0.7rem' fontFamily='Nunito' mx={0.5}>{anime.type}</Typography>
                            <Typography noWrap fontSize='0.7rem' fontFamily='Nunito' mx={0.5}>•</Typography>
                            <Typography noWrap fontSize='0.7rem' fontFamily='Nunito' mx={0.5}>{anime.genres[0]}</Typography>
                            <Typography noWrap fontSize='0.7rem' fontFamily='Nunito' mx={0.5}>•</Typography>

                            {anime.rating != null ?
                            <Typography noWrap color={utils.changeRatingColor(anime.rating)} fontSize='0.7rem' fontFamily='Nunito' mx={0.5}>{anime.rating}%</Typography> :
                            <Typography noWrap color='grey' fontSize='0.7rem' fontFamily='Nunito' mx={0.5}>N/A</Typography>
                            }
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

export default RecentlyUpdatedCarousel