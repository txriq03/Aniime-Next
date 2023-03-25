import '@/styles/globals.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Layout from '../components/Layout';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#bd284d'
    },
    secondary: {
      main: '#222222'
    },
    background: {
      default: '#0E0E0E',
    }
  },
  typography: {
    fontFamily: 'Youtube Sans',
  },
  components: {
    MuiInputLabel: {
      defaultProps: {
        sx: {
          fontSize: "1rem",
        },
      },
    },
  }
});

export default function App({ Component, pageProps }) {
  return (
  <ThemeProvider theme={theme}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </ThemeProvider>
  )
}
