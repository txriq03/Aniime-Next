import '../styles/globals.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Layout from '../components/Layout';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

export const theme = createTheme({
  overrides: {
    muiAppBar: {
      colorDefault: {
        backgroundColor: '#000000'
      }
    }
  },
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

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
