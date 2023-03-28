import { useEffect, useState, useRef } from 'react';
import { Grid, Typography, Box, Button, Container, Skeleton, Modal } from '@mui/material';
import { Info, PlayCircle } from '@mui/icons-material';
import axios from 'axios';

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
                setNativeTitle(data.title.romaji)

            } catch (err) {
                throw new Error(err.message);
            }
        }
    }

    const handleClose = () => {
        console.log("Closing...")
        setIsModalOpen(false);
        setEpisodeList(null);
        setAverageEpisode(null);
        setGenres(null);
        setFirstEpisodeId(null);
        setCover(null);
        setRating(null);
        setEnglishTitle(null);
        setNativeTitle(null);
    }

    useEffect(() => {
        getEpisodeList()
    }, [animeId])

  return (
    <Modal align='center' open={isModalOpen} onClose={handleClose} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} >
        <Grid justifyContent='center' sx={{position: 'relative', outline: 0, width: { lg: '800px', md: '600px', sm: '600px', xs: '400px'}, height: '98vh', bgcolor: '#0E0E0E', borderRadius: 2, boxShadow: 10, overflowY: 'auto', overflowX: 'hidden'}} >
            {cover ? 
                <Box component='img' src={cover} sx={{objectFit: 'cover', width: '100%', height: '33%'}}/> : 
                <Skeleton variant='rectangular' width='100%' height='33%'/>
            }
            <Typography variant='h3' fontFamily='Youtube Sans' color='white' align='center' mt={2} sx={{position: 'absolute', top: '25%', ml: 2}}>{englishTitle}</Typography>

        </Grid>

    </Modal>
    
    
  )
}

export default AnimeModal