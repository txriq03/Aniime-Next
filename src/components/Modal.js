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

            } catch (err) {
                throw new Error(err.message);
            }
        }
    }

    useEffect(() => {
        getEpisodeList()
    }, [animeId])

  return (
    <Modal align='center' open={isModalOpen} onClose={() => setIsModalOpen(false)} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} >
        <Grid justifyContent='center' sx={{ outline: 0, width: '35vw', height: '98vh', bgcolor: '#0E0E0E', borderRadius: 2, boxShadow: 10, overflowY: 'auto', overflowX: 'hidden'}} >
            <Typography color='white' align='center' m={5}>Modal</Typography>
        </Grid>

    </Modal>
    
    
  )
}

export default AnimeModal