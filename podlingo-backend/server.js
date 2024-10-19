require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const podcastsRouter = require('./routes/podcast-routes');

const cors = require('cors');

const app = express();

// connect to MongoDB
connectDB();

app.use(express.json())
app.use(cors());

//Route
app.use('/api/podcasts', podcastsRouter);


// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Podcast API!');
  });


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


