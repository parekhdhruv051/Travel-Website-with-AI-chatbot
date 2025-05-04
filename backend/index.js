import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser'; // ✅ imported
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import tourRoute from './routes/tours.js';
import userRoute from './routes/users.js';
import authRoute from './routes/auth.js';
import reviewRoute from './routes/reviews.js';
import bookingRoute from './routes/bookings.js';
import serpapiRoute from './routes/serpapi.js';
import chatRoute from './routes/chatRoutes.js';

// Load environment variables
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
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
  }
};

// ✅ Middlewares
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'https://travel-website-with-ai-chatbot-production.up.railway.app'], // Update frontend URL
  credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.json());

// ✅ Static Images
app.use('/tour-images', express.static('images'));

// ✅ Routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/users', userRoute);  
app.use('/api/v1/review', reviewRoute);
app.use('/api/v1/booking', bookingRoute);
app.use('/api/flights', serpapiRoute);
app.use('/api/chat', chatRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  // Only match non-API routes to index.html
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
  });
}

// ✅ Default route
app.get('/', (req, res) => {
  res.send('✅ Backend server is up and running!');
});

// ✅ Start server
app.listen(port, () => {
  connect();
  console.log(`🚀 Server listening on port ${port}`);
});
