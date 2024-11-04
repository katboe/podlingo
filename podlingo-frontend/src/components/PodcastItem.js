import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActions, Button, styled } from '@mui/material';

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 140,
  backgroundSize: 'contain',
  backgroundColor: theme.palette.background.default,
}));

const PodcastItem = React.memo(({ podcast }) => (
  <StyledCard>
    {podcast.image && (
      <StyledCardMedia
        image={podcast.image}
        title={podcast.title}
      />
    )}
    <CardContent>
      <Typography variant="h5" gutterBottom>
        {podcast.title}
      </Typography>
      <Typography variant="body2" color="textSecondary" paragraph>
        {podcast.description}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Author: {podcast.author}
      </Typography>
    </CardContent>
    <CardActions>
      <Button
        size="small"
        color="primary"
        href={podcast.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        Listen
      </Button>
    </CardActions>
  </StyledCard>
));

export default PodcastItem; 