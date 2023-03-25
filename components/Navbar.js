import { Typography, CssBaseline, Box, Button, IconButton, useMediaQuery, AppBar, Toolbar, OutlinedInput, Drawer, Tooltip, Zoom, Grid} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Menu,  KeyboardDoubleArrowRight, Search, Whatshot, Update, CalendarMonth, Interests, Cottage } from '@mui/icons-material';
import {  FaDiscord } from "react-icons/fa";
import {  useState } from 'react';
import logo from 'public/aniime.png';

const Navbar = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);    
    const [ query, setQuery ] = useState('')

  return (
    <AppBar position="static" sx={{backgroundColor: 'black'}}>
    <Toolbar>
      <IconButton sx={{ml: 5}} onClick={() => setIsDrawerOpen(true)}>
        <Menu fontSize='large' />
      </IconButton>
      <Box
        component='img'
        alt="Aniime"
        src='/aniime.png'
        sx={{
          cursor: 'pointer',
          py: '12px',
          px: '10px',
          width: '170px',
          flexGrow: 0
        }}
      />
      <Typography>by txriq03</Typography>
      <OutlinedInput sx={{ m: 'auto', width: '30%', bgcolor: '#0e0e0e', textAlign: 'center', fontFamily: 'Nunito', borderRadius: 2}} size='small' onChange={(e) => setQuery(e.target.value)} startAdornment={<IconButton sx={{ml: -0.5}} > <Search/> </IconButton>} placeholder='Search...' >Search...</OutlinedInput>
      <IconButton sx={{mr: 1}} href='https://discord.com/invite/qTPfvMxzNH'>
        <FaDiscord size='1.2em' color='#5562EA' />
      </IconButton>
      <Button variant='contained' size='medium' endIcon={<KeyboardDoubleArrowRight/>} sx={{mr: 10, whiteSpace: 'nowrap', minWidth: 80}} >Sign in</Button>
    </Toolbar>
  </AppBar>
  )
}

export default Navbar