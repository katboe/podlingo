import dotenv from 'dotenv';
dotenv.config(); 
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';

import connectDB from './config/db.js'; // Use import
import podcastRouter from './routes/podcast-routes.js'; // Update to import
import authRouter from './routes/auth.js';
import userRouter from './routes/user.js'; // Update to import
import authenticateJWT from './middleware/auth.js';

const app = express();

// connect to MongoDB
connectDB();

console.log(process.env.CLIENT_URL)

const corsOptions = {
  origin: process.env.CLIENT_URL, // Your frontend's URL
  credentials: true,               // Allow cookies and credentials to be sent
};

app.use(express.json())
app.use(cors(corsOptions));
app.use(cookieParser());

//Route
app.use('/api/podcasts', podcastRouter);

// Use authentication routes
app.use('/api/auth', authRouter);

// Use authentication routes
app.use('/api/user', userRouter);

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Podlingo API!');
  });


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


