import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Paper, 
  Fade, 
  Container,
  Grid,
  useTheme,
  alpha,
  useMediaQuery,
  Theme
} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InventoryIcon from '@mui/icons-material/Inventory';
import TimelineIcon from '@mui/icons-material/Timeline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ShipmentIdForm from '../ShipmentIdForm';

const HeroPattern = () => (
  <Box
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: -1,
      height: '100%',
      opacity: 0.4,
      background: theme => `
        radial-gradient(circle at 100% 0%, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 25%),
        radial-gradient(circle at 0% 80%, ${alpha(theme.palette.secondary.main, 0.1)} 0%, transparent 25%)
      `,
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '100%',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM36 4V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }
    }}
  />
);

const FeatureCard = ({ icon, title, description }: { 
  icon: React.ReactNode, 
  title: string, 
  description: string 
}) => {
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  
  return (
    <Fade in timeout={1000}>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          height: '100%',
          backgroundColor: 'background.paper',
          borderRadius: 4,
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s ease-in-out',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '4px',
            background: theme => `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            opacity: 0,
            transition: 'opacity 0.3s ease-in-out'
          },
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: theme => `0 12px 28px ${alpha(theme.palette.primary.main, 0.15)}`,
            '&::before': {
              opacity: 1
            }
          }
        }}
      >
        <Box 
          sx={{ 
            color: 'primary.main',
            mb: 2,
            transform: isSmall ? 'scale(0.9)' : 'none',
            transition: 'transform 0.3s ease'
          }}
        >
          {icon}
        </Box>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Paper>
    </Fade>
  );
};

const TrackingInputPage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSubmit = (shipmentId: string) => {
    navigate(`/track/${shipmentId}`);
  };

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>
      <HeroPattern />
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            py: { xs: 4, md: 8 }
          }}
        >
          <Fade in timeout={800}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Box
                sx={{
                  display: 'inline-flex',
                  p: 2,
                  borderRadius: '50%',
                  backgroundColor: 'primary.light',
                  mb: 3
                }}
              >
                <LocalShippingIcon
                  sx={{
                    fontSize: 60,
                    color: 'primary.main',
                    animation: 'float 3s ease-in-out infinite'
                  }}
                />
              </Box>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 800,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: 'text',
                  textFillColor: 'transparent',
                  mb: 2
                }}
              >
                Track Your Shipment
              </Typography>
              <Typography
                variant="h5"
                color="text.secondary"
                sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}
              >
                Enter your shipment ID to get real-time updates on your package's journey
              </Typography>
            </Box>
          </Fade>

          <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', mb: 6 }}>
            <ShipmentIdForm onSubmit={handleSubmit} />
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <FeatureCard
                icon={<InventoryIcon sx={{ fontSize: 40 }} />}
                title="Real-Time Tracking"
                description="Monitor your shipments with instant status updates and location information"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FeatureCard
                icon={<TimelineIcon sx={{ fontSize: 40 }} />}
                title="Detailed Timeline"
                description="View comprehensive timeline of your shipment's journey from origin to destination"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FeatureCard
                icon={<LocationOnIcon sx={{ fontSize: 40 }} />}
                title="Location Updates"
                description="Track exact locations and see where your package has been and where it's headed"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FeatureCard
                icon={<LocalShippingIcon sx={{ fontSize: 40 }} />}
                title="Global Coverage"
                description="Track shipments across multiple locations and transportation methods"
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default TrackingInputPage;
