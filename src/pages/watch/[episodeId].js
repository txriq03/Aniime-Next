import { Typography, Grid } from '@mui/material';
import 'vidstack/define/media-player.js';
import { MediaOutlet, MediaPlayer } from '@vidstack/react';
import 'vidstack/styles/defaults.css';
import Axios from 'axios';



const Video = ({videoUrl}) => {
    return (
        <Grid justifyContent='center'>
            <MediaPlayer controls autoplay style={{width: '90vw', align: 'center'}} src={process.env.NEXT_PUBLIC_PROXY + '/' + videoUrl}> <MediaOutlet/> </MediaPlayer>
        </Grid>

        )
    }
    

export const getServerSideProps = async (context) => {
    const { params } = context
    const { episodeId } = params

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/meta/anilist/watch/${episodeId}`)
    const data = await response.json()

    return {
        props: {
            videoUrl: data.sources[3].url
        }
    }

    // try {
    //     const { data } = await Axios.get(`${process.env.NEXT_PUBLIC_API_URL}/meta/anilist/watch/${episodeId}`)
    //     console.log(data)
    //     return {
    //         props: {
    //             videoUrl: data.sources[3].url
    //         }
    //     }
    // } catch(err) {
    //     throw new Error(err.message);
    // }
}

  export default Video