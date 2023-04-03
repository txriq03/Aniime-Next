import { Typography, Grid } from '@mui/material';
import 'vidstack/define/media-player.js';
import { MediaOutlet, MediaPlayer } from '@vidstack/react';
import 'vidstack/styles/defaults.css';
import Axios from 'axios';
import router from 'next/router';
import { useQuery } from 'react-query';
import { api } from '../../utils';


const Video = () => {
    const { episodeId } = router.query
    const { data, status } = useQuery(['StreamingLink'], () => api.getSource(episodeId));
    console.log(data.sources[3].url)
    const videoUrl = data.sources[3].url

    return (
        <Grid justifyContent='center'>
            <MediaPlayer controls autoplay style={{width: '90vw', align: 'center'}} src={process.env.NEXT_PUBLIC_PROXY + '/' + videoUrl}> <MediaOutlet/> </MediaPlayer>
        </Grid>
        )
    }
    

// export const getServerSideProps = async (context) => {
//     const { episodeId } = context.query;

//     try {
//         const { data } = await Axios.get(`${process.env.NEXT_PUBLIC_API_URL}/meta/anilist/watch/${episodeId}`)
//         console.log(data)
//         return {
//             props: {
//                 videoUrl: data.sources[3].url
//             }
//         }
//     } catch(err) {
//         throw new Error(err.message);
//     }
// }

  export default Video