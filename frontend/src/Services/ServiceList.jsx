import React from 'react'
import ServiceCard from './ServiceCard';
import {Col} from "reactstrap";

import weatherImg from '../assets/images/weather.png'
import guideImg from '../assets/images/guide.png'
import customizationImg from '../assets/images/customization.png'


const servicesData = [

    {
        imgUrl: weatherImg,  // Replace with your actual image reference
        title: "Real-Time Weather Updates",
        desc: "Stay informed with live weather updates for all your destinations, so you can pack smart and plan your activities with confidence.",
    },
    
    
    {
        imgUrl:guideImg,
        title:"Best Tour Guide",
        desc: "Discover tour guides to make your journey unforgettable. Explore cities, historical landmarks, and hidden gems with expert local knowledge.",
    },

    {
        imgUrl:customizationImg,
        title:"customization",
        desc: "Plan your trip your way! Customize itineraries, choose destinations, and personalize your travel experiences to match your interests and budget.",
    },

    
    
]


const ServiceList = () => {
  return <>
  
  {
    servicesData.map((item,index) => (
        <Col lg="3" md='6' sm='12' className='mb-4' key={index}>
            <ServiceCard item={item} />
        </Col>
    ))
  }
  
  </>
};

export default ServiceList;