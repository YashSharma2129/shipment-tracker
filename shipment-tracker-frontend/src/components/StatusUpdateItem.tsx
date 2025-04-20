import React from 'react';
import { Box, Paper, Typography, Fade } from '@mui/material';
import { StatusUpdateItemProps } from '../types';

const StatusUpdateItem: React.FC<StatusUpdateItemProps> = ({ update }) => {
  return (
    <Fade in timeout={800}>
      <Paper
        elevation={1}
        sx={{
          p: 2,
          mb: 2,
          borderRadius: 2,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 4,
            bgcolor: 'primary.main',
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,
          },
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: 3,
          }
        }}
      >
        <Box>
          <Typography variant="h6" color="primary.main" gutterBottom>
            {update.status}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {update.location}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
            {new Date(update.timestamp).toLocaleString()}
          </Typography>
        </Box>
      </Paper>
    </Fade>
  );
};

export default StatusUpdateItem;
