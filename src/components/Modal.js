import { useEffect, useState, useRef } from 'react';
import { Grid, Typography, Box, Button, Container, Skeleton, Modal } from '@mui/material';
import { Info, PlayCircle } from '@mui/icons-material';
import axios from 'axios';
import styles from '../styles/Modal.module.css';

const AnimeModal = ({setAnimeId, animeId, isModalOpen, setIsModalOpen}) => {
    const [ episodeList, setEpisodeList ] = useState([]);
    const [ trailerUrl, setTrailerUrl ] = useState('');
    const [ averageEpisode, setAverageEpisode ] = useState(0);
    const [ rating, setRating ] = useState(0);
    const [ ratingColor, setRatingColor ] = useState('');
    const [ genres, setGenres ] = useState([]);
    const [ firstEpisodeId, setFirstEpisodeId ] = useState('');
    const [ cover, setCover ] = useState('');
    const [ englishTitle, setEnglishTitle ] = useState('');
    const [ nativeTitle, setNativeTitle ] = useState('');
    const [ description, setDescription ] = useState('');

    const getEpisodeList = async () => {
        console.log(animeId)
        if (animeId != null) {
            try {
                const { data } = await axios.get(`https://api.consumet.org/meta/anilist/info/${animeId}`);
                console.log(data);

                try {
                    setTrailerUrl(`https://www.youtube.com/watch?v=${data.trailer.id}`)
                } catch(err) {
                    console.log(err)
                }
                setEpisodeList(data.episodes.slice(0, 10));
                setAverageEpisode(data.duration)
                setGenres(data.genres)
                setFirstEpisodeId(data.episodes[0].id)
                setCover(data.cover)
                setRating(data.rating)
                setEnglishTitle(data.title.english)
                setNativeTitle(data.title.native)
                setDescription(data.description)

            } catch (err) {
                throw new Error(err.message);
            }
        }
    }
    useEffect(() => {
        getEpisodeList()
    }, [animeId])

    const changeRatingColor = () => {
        if (rating <= 40) {
            setRatingColor('red')
        } else if (rating >= 70) {
            setRatingColor('lightgreen')
        } else {
            setRatingColor('orange')
        }
    }
    useEffect(() => {
        changeRatingColor()
    }, [ rating ])


    const handleClose = () => {
        console.log("Closing...")
        setIsModalOpen(false);
        // setEpisodeList(null);
        // setAverageEpisode(null);
        // setGenres(null);
        // setFirstEpisodeId(null);
        // setCover(null);
        // setRating(null);
        // setEnglishTitle(null);
        // setNativeTitle(null);
    }


  return (
    <Modal align='center' open={isModalOpen} onClose={handleClose} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} >
        <Grid className={styles.ModalGrid} justifyContent='center' sx={{ outline: 0, width: { lg: '800px', md: '600px', sm: '600px', xs: '400px'}, height: '98vh', bgcolor: '#0E0E0E', borderRadius: 1, boxShadow: 10, overflowY: 'auto', overflowX: 'hidden'}} >
            {cover ? 
                <Box component='img' src={cover} sx={{objectFit: 'cover', width: '100%', height: { md: '33%', sm: '22%', xs: '22%'}}}/> : 
                <Skeleton variant='rectangular' width='100%' height='33%'/>
            }
            <Box ml={4} mr={4} mt={1} display='flex' flexDirection='column'>
                <Typography variant='h3' align='left' fontFamily='Youtube Sans' color='white' sx={{display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 1, overflow: 'hidden'}}>{englishTitle}</Typography>
                <Typography variant='h8' align='left' fontFamily='Nunito' color='white' mt={1}>({nativeTitle})</Typography>
                <Box display='flex' mt={1.5}>
                    <Button variant='contained' size='large'><PlayCircle sx={{ mr:0.5 }}/> Watch Episode 1</Button>
                    <Button variant='outlined' size='large' sx={{ ml:1 }}><Info sx={{ mr:0.5 }}/> Watch Trailer</Button>
                </Box>
                <Typography variant='h10' align='left' fontFamily='Nunito' color='lightgrey' mt={1.5} sx={{
                    display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 6, overflow: 'hidden'
                }}>{description}</Typography>
                <Button variant='text' align='left' mt={1} sx={{width: '100px'}}>Show More</Button>
                <Typography variant='h6' color='whitesmoke' fontFamily='Youtube Sans' align='left' mt={1} >Episodes</Typography>
                {episodeList.map(episode => {
                    return (
                        <Box display='flex' flexDirection='row' key={episode.id} sx={{cursor: 'pointer'}}>
                            <Box
                            display='flex'
                            flexDirection='column'
                            component="img"
                            src={"http://aniimeproxy.herokuapp.com/" + episode.image}
                            height='15vw'
                            maxHeight='100px'
                            my={2}
                            
                            borderRadius={1}
                            /> 
                            <Box>
                                <Typography my={2} mx={2} color='whitesmoke' align='left' noWrap textOverflow='hidden'>{episode.number}. {episode.title}</Typography>
                                <Typography fontSize={14} my={-1} mx={2} color='whitesmoke' align='left' fontFamily='Nunito' style={{display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3, overflow: 'hidden'}}>{episode.description}</Typography>
                            </Box>
                        </Box>
                    )
                })}
                <Box align='center' bgcolor='#bd284d' my={2} height={2} width={750}/>
                <Typography variant='h4' fontFamily='Nunito' align='left' ml={2} color='whitesmoke'>About</Typography>
                <Box display='flex'>
                    <Typography fontFamily='Nunito' color='grey' mx={2} mt={1}>Genres: </Typography>
                    <Box display='flex' ml={-1} mt={1}>
                        {genres.map(entry => { return (<Typography color='whitesmoke' fontFamily='Nunito' mr={1}>{entry},</Typography>)})}
                    </Box>
                </Box>
                <Box display ='flex'>
                    <Typography fontFamily='Nunito' color='grey' ml={2} >Average Episode: </Typography>
                    <Typography fontFamily='Nunito' color='whitesmoke' ml={0.5}>{averageEpisode}</Typography>
                </Box>
                <Box display= 'flex'>
                    <Typography fontFamily='Nunito' color='grey' ml={2} mb={3}>Rating: </Typography>
                    <Typography fontFamily='Nunito' color={ratingColor} ml={0.5}>{rating}%</Typography>
                </Box>
            </Box>
        </Grid>

    </Modal>
    
    
  )
}

export default AnimeModal