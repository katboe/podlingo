import dotenv from 'dotenv';
dotenv.config(); 
import cors from 'cors';
import express from 'express';

import connectDB from './config/db.js'; // Use import
import podcastRouter from './routes/podcast-routes.js'; // Update to import

const app = express();

// connect to MongoDB
connectDB();

app.use(express.json())
app.use(cors());

//Route
app.use('/api/podcasts', podcastRouter);


// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Podcast API!');
  });


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


