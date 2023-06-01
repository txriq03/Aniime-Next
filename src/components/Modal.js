import { useEffect, useState } from 'react';
import { Info, PlayCircle } from '@mui/icons-material';
import { Grid, Typography, Box, Button, Skeleton, Modal, Pagination, Backdrop, CircularProgress } from '@mui/material';
import { utils } from '../utils';
import styles from '../styles/Modal.module.css';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { api } from '../utils';

const AnimeModal = ({setAnimeId, animeId, isModalOpen, setIsModalOpen}) => {
    const { data, isError, isLoading, error}  = useQuery({
        queryKey: ['infoQuery', animeId],
        queryFn: () => api.getInfo(animeId),
        enabled: isModalOpen === true
    })

    const episodeList = data?.episodes
    const description = data?.description
    const averageEpisode = data?.duration
    const rating = data?.rating
    const englishTitle = data?.title.english
    const nativeTitle = data?.title.native
    const cover = data?.cover
    const genres = data?.genres
    const firstEpisodeId = data?.episodes[0]?.id
    const trailerUrl = `https://www.youtube.com/watch?v=${data?.trailer?.id}`
    
    //Page variables
    const [ totalPages, setTotalPages ] = useState(0);
    const [ pageNumber, setPageNumber ] = useState(1);
    const pagesVisited = pageNumber * 10;
    const displayEpisodes = episodeList?.slice(pagesVisited - 10, pagesVisited);
    const router = useRouter();

    const handleClose = () => {
        console.log("Closing...")
        setIsModalOpen(false);
        setPageNumber(1);
    }

    const [ isShowMore, setIsShowMore ] = useState(false);



    useEffect(() => {
        utils.episodesEachPage(episodeList, 10, setTotalPages)
    }, [episodeList])

    const handlePageChange = (event, value) => {
        setPageNumber(value);
        console.log('Page ' + value)
    }
 
    if (isError) {
        console.log(`Error: ${error.message}`)
    }

    if (isLoading && isModalOpen == true) {
        return (
            <Backdrop open={true}>
                <CircularProgress color='primary'/>
            </Backdrop>
        )
    }



  return (
    <Modal align='center' open={isModalOpen} onClose={handleClose} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} >
        <Grid className={styles.ModalGrid} justifyContent='center' sx={{
            outline: 0, 
            width: { lg: '800px', md: '600px', sm: '600px', xs: '400px'}, 
            height: '98vh', 
            bgcolor: '#0E0E0E', 
            borderRadius: 1, 
            boxShadow: 10, 
            overflowY: 'auto', 
            overflowX: 'hidden'}} >
            {cover ? 
                <Box component='img' src={cover} sx={{objectFit: 'cover', width: '100%', height: { lg: '33%', md: '25%', sm: '22%', xs: '22%'}}}/> : 
                <Skeleton variant='rectangular' width='100%' height='33%'/>
            }
            <Box ml={4} mr={4} mt={1} display='flex' flexDirection='column'>
                
                <Typography variant='h3' align='left' fontFamily='Youtube Sans' color='white' sx={{
                        display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 1, overflow: 'hidden'
                    }}>{englishTitle}</Typography>
                <Typography variant='h8' align='left' fontFamily='Nunito' color='white' mt={1}>{nativeTitle}</Typography>

                <Box display='flex' mt={1.5}>
                    <Button variant='contained' size='large' onClick={() => router.push('/watch/' + firstEpisodeId)}><PlayCircle sx={{mr: 0.5}}/> Watch Episode 1</Button>
                    <Button variant='outlined' size='large' sx={{ ml:1 }} onClick={() => window.open(trailerUrl, '_blank')}><Info sx={{mr: 0.5}}/>Watch Trailer</Button>
                </Box>

                <Typography variant='h10' align='left' fontFamily='Nunito' color='lightgrey' mt={1.5} sx={{
                    display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: utils.showMore(isShowMore), overflow: 'hidden'
                }}>{description}</Typography>

                <Button variant='text' align='left' mt={1} sx={{width: '100px'}} onClick={() => setIsShowMore(!isShowMore)}>Show {utils.moreOrLess(isShowMore)}</Button>
                <Typography variant='h6' color='whitesmoke' fontFamily='Youtube Sans' align='left' mt={1}>Episodes</Typography>
                
                {episodeList &&
                <Box>
                    {displayEpisodes.reverse().map(episode => {
                        return (
                            <Box display='flex' onClick={() => {router.push('/watch/' + episode.id)}} flexDirection='row' key={episode.id} sx={{cursor: 'pointer'}}>
                                <Box
                                display='flex'
                                flexDirection='column'
                                component="img"
                                src={process.env.NEXT_PUBLIC_PROXY + '/' + episode.image}
                                height='15vw'
                                maxHeight='100px'
                                my={2}
                                
                                borderRadius={1}
                                /> 
                                <Box>
                                    <Typography my={2} mx={2} color='whitesmoke' align='left' noWrap style={{
                                        display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 1, overflow: 'hidden'
                                    }} >{episode.number}. {episode.title}</Typography>
                                    <Typography fontSize={14} my={-1} mx={2} color='whitesmoke' align='left' fontFamily='Nunito' style={{
                                            display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3, overflow: 'hidden'
                                        }}>{episode.description}</Typography>
                                </Box>
                            </Box>
                        )
                    })} 
                </Box> }

                <Box display='flex' justifyContent='center' mt={1}>
                    <Pagination count={totalPages} defaultPage={1} siblingCount={3} boundaryCount={2} page={pageNumber} onChange={handlePageChange} color='primary' />
                </Box>
                <Typography variant='h4' fontFamily='Nunito' align='left' ml={2} mt={1} color='whitesmoke'>About</Typography>
                <Box display='flex'>
                    <Typography fontFamily='Nunito' color='grey' mx={2} mt={1}>Genres: </Typography>
                    {genres &&
                    <Box display='flex' ml={-1} mt={1}>
                        {genres.map(entry => { return (<Typography color='whitesmoke' fontFamily='Nunito' mr={1} key={entry}> {entry}, </Typography>)})}
                    </Box> }
                </Box>
                <Box display ='flex'>
                    <Typography fontFamily='Nunito' color='grey' ml={2} >Average Episode: </Typography>
                    <Typography fontFamily='Nunito' color='whitesmoke' ml={0.5}>{averageEpisode}</Typography>
                </Box>
                <Box display= 'flex'>
                    <Typography fontFamily='Nunito' color='grey' ml={2} mb={3}>Rating: </Typography>
                    {rating != null ?
                    <Typography fontFamily='Nunito' color={utils.changeRatingColor(rating)} ml={0.5}>{rating}%</Typography> :
                    <Typography fontFamily='Nunito' color='silver' ml={0.5}>N/A</Typography>
                    }
                </Box>
            </Box>
        </Grid>

    </Modal>
    
    
  )
}

export default AnimeModal