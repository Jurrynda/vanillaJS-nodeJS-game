import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import config from './config';
import userRouter from './routers/userRouter';

mongoose
  .connect(config.MONGODB_URL)
  .then(() => {
    console.log('connected to database');
  })
  .catch((error) => {
    console.log(error.reason);
  });

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/users', userRouter);
app.use(express.static(path.join(__dirname, '/../frontend')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../frontend/index.html'));
});

app.listen(config.PORT, () => {
  console.log('server running on port 5000');
});
