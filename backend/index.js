import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';
import { userRouter } from './routes/userRoute.js';
import cookieParser from 'cookie-parser';

const app = express();

// CORS Configuration
app.use(cors());

app.use(express.json({ limit: '16kb' }));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser());

app.get('/', (request, response) => {
  return response.status(234).send('Welcome To MERN Stack Tutorial');
});

app.use('/api/v1/books', booksRoute);
app.use('/api/v1/user', userRouter);

app.use('/books', booksRoute);


mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
