"use client"
import { Box, Button} from '@mui/material';



export default function Error({error, reset}) {
    return (
        <>
            <Box>
                This ain't loading up: {error.message}
            </Box>
            <Button variant='contained' align='center' onClick={() => reset()}>Retry</Button>
        </>
    )
}