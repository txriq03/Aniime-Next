import { Typography, CssBaseline, Box, Button, IconButton, useMediaQuery, AppBar, Toolbar, OutlinedInput, Drawer, Tooltip, Zoom, Grid} from '@mui/material';
import { Menu,  KeyboardDoubleArrowRight, Search, Whatshot, Update, CalendarMonth, Interests, Cottage } from '@mui/icons-material';
import { FaDiscord } from "react-icons/fa";
import { useState } from 'react';
import { styled } from '@mui/system';
import styles from '../styles/Navbar.module.css';
import { useRouter } from 'next/router';

const StyledIconButton = styled(IconButton)`
  &:hover {
    background: none;
  }`

const Navbar = () => {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);    
  const [ query, setQuery ] = useState('')

  return (
    <>
      <Drawer anchor='left' open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} elevation={0}>
        <Box p={2} sx={{display: 'flex', flexDirection: 'column'}}>
          <Tooltip title="Home" TransitionComponent={Zoom} placement='right' arrow >
            <Box className={router.pathname =='/home' ? styles.homeActive : styles.home}>
              <StyledIconButton sx={{ml: 1.2, mt: 1.2}} >
                <Cottage className={styles.homeIcon} style={{ fontSize: 45 }}  />
              </StyledIconButton>
            </Box>
          </Tooltip>
          <Tooltip placement='right' TransitionComponent={Zoom} title='Trending' arrow  >
            <Box className={router.pathname =='/trending' ? styles.whatshotActive : styles.whatshot}>
              <StyledIconButton sx={{ml: 1.2, mt: 1.2}} >
                <Whatshot className={styles.whatshotIcon} style={{ fontSize: 45 }} />
              </StyledIconButton>
            </Box>
          </Tooltip>
          <Tooltip placement='right' TransitionComponent={Zoom} title='Recently Updated' arrow >
            <Box className={router.pathname == '/updated' ? styles.updateActive : styles.update}>
              <StyledIconButton sx={{ml: 1.2, mt: 1.2}}>
                <Update className={styles.updateIcon} style={{ fontSize: 45 }} />
              </StyledIconButton>
            </Box>
          </Tooltip>
          <Tooltip placement='right' TransitionComponent={Zoom} title='Schedule' arrow>
            <Box className={router.pathname == '/schedule' ? styles.calendarActive : styles.calendar} >
              <StyledIconButton sx={{ml: 1.2, mt: 1.2}}>
                <CalendarMonth className={styles.calendarIcon} style={{ fontSize: 45 }} />
              </StyledIconButton>
            </Box>
          </Tooltip>
          <Tooltip placement='right' TransitionComponent={Zoom} title='Categories' arrow >
            <Box className={router.pathname == '/categories' ? styles.categoriesActive : styles.categories} >
              <StyledIconButton sx={{ml: 1.2, mt: 1.2}}>
                <Interests className={styles.categoriesIcon} style={{ fontSize: 45 }} />
              </StyledIconButton>
            </Box>
          </Tooltip>
        </Box>
      </Drawer>

      <AppBar position="static" enableColorOnDark sx={{bgcolor: 'black'}} elevation={1} >
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
          <Typography noWrap>by txriq03</Typography>
          <OutlinedInput sx={{ m: 'auto', width: '30%', bgcolor: '#0e0e0e', textAlign: 'center', fontFamily: 'Nunito', borderRadius: 2}} size='small' onChange={(e) => setQuery(e.target.value)} startAdornment={<IconButton sx={{ml: -0.5}} > <Search/> </IconButton>} placeholder='Search...' />
          <IconButton sx={{mr: 1}} href='https://discord.com/invite/qTPfvMxzNH'>
            <FaDiscord size='1.2em' color='#5562EA'/>
          </IconButton>
          <Button variant='contained' endIcon={<KeyboardDoubleArrowRight/>} sx={{mr: 10, whiteSpace: 'nowrap', minWidth: 80}} >Sign in</Button>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar