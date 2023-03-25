import { Typography, Box, Button } from '@mui/material';
import { Info, PlayArrowRounded, Theaters} from '@mui/icons-material';
import { useState, useRef } from 'react';
import { Carousel } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';

const BannerCarousel = ({results}) => {
  console.log(results)
  const [ animeBannerUrl, setAnimeBannerUrl ] = useState('');
  const [ animeTitle, setAnimeTitle ] = useState('');
  const [ nativeTitle, setNativeTitle ] = useState('');
  const [ animeDescription, setAnimeDescription ] = useState('');
  const [ animeId, setAnimeId ] = useState('');

  const autoplay = useRef(Autoplay({ delay: 5000 }));

  const chooseTitle= (english, romaji) => {
    if (english != null) {
      return english
    } else {
      return romaji
    }
  }

  return (
    <Carousel mx='auto'  loop plugins={[autoplay.current]} withIndicators height='25vw' draggable align='center' sx={{ position: 'relative'}}>
    {results.slice(0, 7).map(anime => (
      <Carousel.Slide>
        <Box
        className="carousel-cover"
        component='img'
        src={anime.cover}
        sx={{objectFit: 'cover', height: '100%', width: '100%', borderRadius: 3, filter: 'brightness(50%) blur(5px)'}}
        />
        <Box width='35%' sx={{display: 'block', position: 'absolute', bottom: '60%', left: '10%'}}>
          <Typography color='white' className='cover-title' variant='h2' fontSize='3vw' fontFamily='Nunito' fontWeight='bold' sx={{display:'-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2, overflow: 'hidden'}} >{chooseTitle(anime.title.english, anime.title.romaji)}</Typography>
        </Box>
        <Box width='35%' sx={{display: 'block', position: 'absolute', top: '40%', left: '10%'}}>
          <Typography color='white' variant='h6' fontSize='1.1vw' fontFamily='Nunito' sx={{display:'-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3, overflow: 'hidden'}}>{anime.description}</Typography>
          <Button variant='contained' size='large' 
          onClick={() => {
            setAnimeWindowUrl(anime.cover); 
            setAnimeTitle(chooseTitle(anime.title.english, anime.title.romaji)); 
            setNativeTitle(anime.title.native); 
            setAnimeDescription(anime.description);
            setAnimeId(anime.id); 
            // setIsBackdropOpen(true)
          }} style={{height: '2.7vw', width: '10vw', fontSize: '1.2vw', whiteSpace: 'nowrap'}} sx={{borderRadius: 2, mt: 2}}><PlayArrowRounded style={{fontSize: '1.8rem'}} sx={{ml:-1}}/> Play Now</Button>
          <Button variant='contained' color='secondary' size='large' style={{height: '2.7vw', width: '11vw', fontSize: '1.1vw', whiteSpace: 'nowrap'}} sx={{borderRadius: 2, mt: 2, ml: 2}}><Info style={{fontSize: '1.2rem'}} sx={{mr: 0.5}}/> View Details</Button>
        </Box>
      </Carousel.Slide>
    ))}
  </Carousel>
)
}
export default BannerCarousel