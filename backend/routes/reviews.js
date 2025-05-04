import express from 'express';
import { createReview } from '../controllers/reviewController.js';
import { verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

// Post route to create a review for a specific tour
router.post('tour/:tourId', verifyUser, async (req, res) => {
  const { tourId } = req.params; // Extract tourId from the URL parameters

  // Check if tourId is valid
  if (!tourId) {
    return res.status(400).json({ success: false, message: 'Missing tourId parameter' });
  }

  try {
    // Call the controller function to handle review creation
    await createReview(req, res);
  } catch (error) {
    // Catch any errors thrown in the createReview function
    console.error('Error in review submission:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while submitting your review. Please try again later.',
    });
  }
});

console.log('🧭 reviews.js route loaded');


export default router;
