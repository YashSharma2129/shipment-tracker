import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Container, 
  Paper, 
  Typography, 
  CircularProgress, 
  Alert,
  Grid
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { trackShipment } from '../../services/shipmentService';
import { Shipment, StatusUpdate } from '../../types';
import ShipmentDetails from '../ShipmentDetails';
import StatusTimeline from '../StatusTimeline';
import MapIcon from '@mui/icons-material/Map';
import PlaceIcon from '@mui/icons-material/Place';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

const AnimatedBox = styled(Box)(({ theme }) => ({
  animation: 'slideIn 0.6s ease-out',
  '@keyframes slideIn': {
    from: {
      opacity: 0,
      transform: 'translateY(20px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
}));

const ProgressIndicator = ({ currentStatus }: { currentStatus: string }) => {
  const steps = ['Order Placed', 'In Transit', 'Out for Delivery', 'Delivered'];
  const currentStep = steps.indexOf(currentStatus) + 1;
  
  return (
    <Timeline position="alternate">
      {steps.map((step, index) => (
        <TimelineItem key={step}>
          <TimelineSeparator>
            <TimelineDot 
              color={index < currentStep ? "primary" : "grey"}
              variant={index < currentStep ? "filled" : "outlined"}
            >
              {index === 0 ? <FlightTakeoffIcon /> : 
               index === steps.length - 1 ? <FlightLandIcon /> : null}
            </TimelineDot>
            {index < steps.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>
            <Typography
              variant="body2"
              color={index < currentStep ? "primary" : "text.secondary"}
              fontWeight={index === currentStep - 1 ? 600 : 400}
            >
              {step}
            </Typography>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};

const StyledStatusPaper = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  borderRadius: theme.spacing(2),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at top right, rgba(255,255,255,0.2), transparent 70%)',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    width: '30%',
    height: '100%',
    background: `linear-gradient(45deg, transparent, ${alpha(theme.palette.common.white, 0.1)})`,
    transform: 'translateX(100%)',
    transition: 'transform 0.6s ease-in-out',
  },
  '&:hover::after': {
    transform: 'translateX(0)',
  },
}));

const TrackingResultPage: React.FC = () => {
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const getLatestStatus = (shipment: Shipment): StatusUpdate | null => {
    return shipment.statusUpdates.length > 0 ? shipment.statusUpdates[0] : null;
  };

  useEffect(() => {
    const fetchShipment = async () => {
      try {
        setLoading(true);
        if (!id) throw new Error('No shipment ID provided');
        const data = await trackShipment(id);
        setShipment(data);
      } catch (err) {
        if ((err as any)?.response?.status === 404) {
          setError('Shipment not found. Please check the ID and try again.');
        } else {
          setError('An error occurred while fetching the shipment details.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchShipment();
  }, [id]);

  const handleBackClick = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <Box sx={{ 
        height: '80vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 2 
      }}>
        <CircularProgress size={60} />
        <Typography variant="h6" color="text.secondary">
          Loading shipment details...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <AnimatedBox>
          <Alert 
            severity="error" 
            sx={{ 
              mb: 3,
              fontSize: '1.1rem',
              '& .MuiAlert-icon': { fontSize: '2rem' }
            }}
          >
            {error}
          </Alert>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleBackClick}
            variant="contained"
            size="large"
            sx={{ 
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1.1rem'
            }}
          >
            Back to Tracking
          </Button>
        </AnimatedBox>
      </Container>
    );
  }

  if (!shipment) return null;

  const latestStatus = getLatestStatus(shipment);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <AnimatedBox>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleBackClick}
            variant="outlined"
            size="large"
            sx={{ 
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem'
            }}
          >
            Back to Tracking
          </Button>
          <Typography variant="h4" fontWeight="bold" color="primary">
            Shipment Details
          </Typography>
        </Box>

        {latestStatus && (
          <>
            <StyledStatusPaper elevation={4}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Typography 
                      variant="overline" 
                      sx={{ 
                        color: 'primary.contrastText',
                        opacity: 0.9,
                        letterSpacing: 2,
                        fontWeight: 600
                      }}
                    >
                      CURRENT STATUS
                    </Typography>
                    <Typography 
                      variant="h3" 
                      sx={{ 
                        color: 'primary.contrastText',
                        fontWeight: 700,
                        mb: 2
                      }}
                    >
                      {latestStatus.status}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <PlaceIcon sx={{ color: 'primary.contrastText' }} />
                      <Typography variant="h6" color="primary.contrastText">
                        {latestStatus.location}
                      </Typography>
                    </Box>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: 'primary.contrastText',
                        opacity: 0.9
                      }}
                    >
                      Last updated: {new Date(latestStatus.timestamp).toLocaleString()}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Box 
                    sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      color: 'primary.contrastText',
                      opacity: 0.9
                    }}
                  >
                    <MapIcon sx={{ fontSize: 100 }} />
                  </Box>
                </Grid>
              </Grid>
            </StyledStatusPaper>
            
            <Box sx={{ mb: 4 }}>
              <ProgressIndicator currentStatus={latestStatus.status} />
            </Box>
          </>
        )}

        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <ShipmentDetails shipment={shipment} />
          </Grid>
          <Grid item xs={12} md={7}>
            <StatusTimeline updates={shipment.statusUpdates} />
          </Grid>
        </Grid>
      </AnimatedBox>
    </Container>
  );
};

export default TrackingResultPage;
