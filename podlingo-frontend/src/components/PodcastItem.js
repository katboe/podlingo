import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';

const PodcastItem = React.memo(({ podcast }) => (
    <Card variant="outlined" style={{ marginBottom: '16px' }}>
    <CardContent>
      <Typography variant="h5" component="div">
        {podcast.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {podcast.description}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Author: {podcast.author}
      </Typography>
      {podcast.image && (
        <img
          src={podcast.image}
          alt={podcast.title}
          loading="lazy"
          style={{ width: '100px', marginTop: '8px' }}
        />
      )}
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
  </Card>
  ));

export default PodcastItem;