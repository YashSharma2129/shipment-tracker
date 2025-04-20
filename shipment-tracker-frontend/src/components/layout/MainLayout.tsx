import React, { ReactNode, ReactElement } from 'react';
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  useScrollTrigger,
  Slide,
  Fade,
} from '@mui/material';

interface Props {
  children: ReactElement;
}

interface MainLayoutProps {
  children: ReactNode;
}

function HideOnScroll({ children }: Props) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <HideOnScroll>
        <AppBar 
          position="fixed" 
          elevation={0} 
          sx={{ 
            bgcolor: 'background.paper',
            borderBottom: 1,
            borderColor: 'divider'
          }}
        >
          <Toolbar>
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                flexGrow: 1, 
                color: 'primary.main',
                fontWeight: 600,
                letterSpacing: 0.5,
                fontSize: { xs: '1.1rem', sm: '1.3rem' }
              }}
            >
              Shipment Tracker
            </Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar /> {/* Spacer for fixed AppBar */}
      
      <Container 
        component="main" 
        maxWidth="lg" 
        sx={{ 
          mt: { xs: 2, sm: 4 },
          mb: 4,
          flex: 1,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Fade in timeout={800}>
          <Box>{children}</Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default MainLayout;
