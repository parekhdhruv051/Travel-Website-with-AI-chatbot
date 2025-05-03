import Tour from "../Models/Tour.js";
import Review from "../Models/Review.js";





export const createReview = async(req, res)=>{

    const tourId = req.params.tourId;
    const newReview = new Review({...req.body});
 
    try {

        const savedReview = await newReview.save();
        
        await Tour.findOneAndUpdate(
            { _id: tourId },
            { $push: { reviews: savedReview._id } },
            { new: true }
        );

        res.status(200).json({success:true, message:'Review submitted',
            data:savedReview
        });

    } catch (err) {
        res.status(500).json({success:false, message:'failed to submit',
        });
    }
};