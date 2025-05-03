import Tour from "../Models/Tour.js";
import Review from "../Models/Review.js";

export const createReview = async (req, res) => {
  const { tourId } = req.params;  // Extract the tourId from request params
  const { reviewText, rating, username } = req.body;  // Destructure review data from request body

  // Basic validation for review data
  if (!reviewText || !rating || !username) {
    return res.status(400).json({
      success: false,
      message: 'Review text, rating, and username are required.'
    });
  }

  try {
    // Create a new review
    const newReview = new Review({
      tourId,
      reviewText,
      rating,
      username,
      createdAt: new Date()
    });

    // Save the review to the database
    const savedReview = await newReview.save();

    // Update the corresponding tour with the new review ID
    await Tour.findByIdAndUpdate(
      tourId,
      { $push: { reviews: savedReview._id } },
      { new: true }
    );

    // Respond with success message and the saved review
    res.status(200).json({
      success: true,
      message: 'Review submitted successfully.',
      data: savedReview
    });

  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({
      success: false,
      message: 'Failed to submit review. Please try again later.'
    });
  }
};
