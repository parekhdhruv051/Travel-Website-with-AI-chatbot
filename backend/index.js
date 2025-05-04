import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

import tourRoute from './routes/tours.js';
import userRoute from './routes/users.js';
import authRoute from './routes/auth.js';
import reviewRoute from './routes/reviews.js';
import bookingRoute from './routes/bookings.js';
import serpapiRoute from './routes/serpapi.js';
import chatRoute from './routes/chatRoutes.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ✅ MongoDB Connection
mongoose.set('strictQuery', false);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
  }
};

// ✅ Middlewares
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-frontend-url.com'], // Replace with real frontend URL
  credentials: true,
}));
app.use(cookieParser());
app.use(bodyParser.json());

// ✅ Static Images
app.use('/tour-images', express.static(path.join(__dirname, 'images')));

// ✅ Safe Route Mounting with Logs
const safeMount = (routePath, handler, name) => {
  try {
    if (!handler) throw new Error(`${name} route is undefined`);
    app.use(routePath, handler);
    console.log(`✅ ${name} route mounted at ${routePath}`);
  } catch (err) {
    console.error(`❌ Failed to mount ${name} route at ${routePath}:`, err.message);
  }
};

safeMount('/api/v1/auth', authRoute, 'auth');
safeMount('/api/v1/tours', tourRoute, 'tours');
safeMount('/api/v1/users', userRoute, 'users');
safeMount('/api/v1/review', reviewRoute, 'reviews');
safeMount('/api/v1/booking', bookingRoute, 'bookings');
safeMount('/api/flights', serpapiRoute, 'serpapi');
safeMount('/api/chat', chatRoute, 'chat');

// ✅ Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
  });
}

// ✅ Default API Health Check
app.get('/', (req, res) => {
  res.send('✅ Backend server is up and running!');
});

// ✅ Catch-All 404 Handler
app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ✅ Start server
app.listen(port, () => {
  connect();
  console.log(`🚀 Server listening on port ${port}`);
});
