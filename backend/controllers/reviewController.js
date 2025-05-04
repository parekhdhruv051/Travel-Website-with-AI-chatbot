import Tour from "../Models/Tour.js";
import Review from "../Models/Review.js";

export const createReview = async (req, res) => {
  const { tourId } = req.params;
  const { reviewText, rating } = req.body;

  // Ensure review text and rating are provided
  if (!reviewText || !rating) {
    return res.status(400).json({
      success: false,
      message: 'Review text and rating are required.',
    });
  }

  try {
    // Use authenticated user from token
    const username = req.user?.id || 'Anonymous';

    const newReview = new Review({
      tourId,
      reviewText,
      rating,
      username, // could be req.user.username if you store that in the token
      createdAt: new Date(),
    });

    const savedReview = await newReview.save();

    await Tour.findByIdAndUpdate(
      tourId,
      { $push: { reviews: savedReview._id } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Review submitted successfully.',
      data: savedReview,
    });
  } catch (err) {
    console.error('Review submission error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to submit review. Please try again later.',
    });
  }
};
