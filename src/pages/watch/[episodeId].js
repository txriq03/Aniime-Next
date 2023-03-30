import { Typography, Grid } from '@mui/material';
import 'vidstack/define/media-player.js';
import { MediaOutlet, MediaPlayer } from '@vidstack/react';
import 'vidstack/styles/defaults.css';
import Axios from 'axios';



const Video = ({videoUrl}) => {
    return (
        <Grid justifyContent='center'>
            <MediaPlayer controls autoplay style={{width: '90vw', align: 'center'}} src={"https://aniimeproxy.herokuapp.com/" + videoUrl}> <MediaOutlet/> </MediaPlayer>
        </Grid>

        )
    }
    

export const getServerSideProps = async (context) => {
    const { episodeId } = context.query;

    try {
        const { data } = await Axios.get(`https://api.consumet.org/meta/anilist/watch/${episodeId}`)
        console.log(data)
        return {
            props: {
                videoUrl: data.sources[3].url
            }
        }
    } catch(err) {
        throw new Error(err.message);
    }
}

  export default Video