import React from 'react'
import Slider from 'react-slick'
import ava01 from '../../assets/images/ava-1.jpg'
import ava02 from '../../assets/images/ava-2.jpg'
import ava03 from '../../assets/images/ava-3.jpg'

const Testimonials = () => {
   
    const settings = {
        dots:true,
        infinite:true,
        autoplay:true,
        speed:1000,
        swipeToSlide:true,
        autoplaySpeed:2000,
        SlidesToShow:3,

        responsive:[
            {
                breakpoint:992,
                settings:{
                    slidersToShow:2,
                    SlidesToScroll:1,
                    infinite:true,
                    dots:true,
                },
            },
            {
                breakpoint:576,
                settings:{
                    slidersToShow:1,
                    SlidesToScroll:1,
                    
                },
            },

        ]
    }

  return <Slider {...settings}>
    <div className='testimonial py-4 px-3'>
        <p>This was the smoothest and most enjoyable trip we've ever taken — everything was handled perfectly!</p>

            <div className='d-flex align-items-center gap-4 mt-3'>
                <img src={ava01} className='w-25 h-25 rounded-2' alt=''/>
                <div>
                    <h6 className='mb-0 mt-3'>Jhon Doe</h6>
                    <p>Customer</p>
                </div>
            </div>
    </div>
    <div className='testimonial py-4 px-3'>
        <p>Their team went above and beyond to make sure our vacation was unforgettable. </p>

            <div className='d-flex align-items-center gap-4 mt-3'>
                <img src={ava02} className='w-25 h-25 rounded-2' alt=''/>
                <div>
                    <h6 className='mb-0 mt-3'>Lia franklin</h6>
                    <p>Customer</p>
                </div>
            </div>
    </div>
    <div className='testimonial py-4 px-3'>
        <p>I can't wait to travel with them again. Absolutely top-notch service! </p>

            <div className='d-flex align-items-center gap-4 mt-3'>
                <img src={ava03} className='w-25 h-25 rounded-2' alt=''/>
                <div>
                    <h6 className='mb-0 mt-3'>adam</h6>
                    <p>Customer</p>
                </div>
            </div>
    </div>
    <div className='testimonial py-4 px-3'>
        <p>As a solo female traveler, I felt safe, supported, and completely taken care of throughout the trip. I'll definitely book again! </p>

            <div className='d-flex align-items-center gap-4 mt-3'>
                <img src={ava02} className='w-25 h-25 rounded-2' alt=''/>
                <div>
                    <h6 className='mb-0 mt-3'>Lia franklin</h6>
                    <p>Customer</p>
                </div>
            </div>
    </div>
  </Slider>
  
};

export default Testimonials;