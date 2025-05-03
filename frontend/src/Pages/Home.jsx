import React from 'react';
import '../styles/home.css';
import { Container, Row, Col } from 'reactstrap'; // Correct import
import heroImg from '../assets/images/hero-img01.jpg';
import heroImg02 from '../assets/images/hero-img02.jpg';
import heroVideo from '../assets/images/hero-video.mp4'; // Corrected video import
import Subtitle from '../shared/Subtitle';
import worldImg from '../assets/images/world.png'; // Corrected image import
import experienceImg from '../assets/images/experience.png';

import SearchBar from '../shared/SearchBar';
import ServiceList from '../Services/ServiceList';
import FeaturedTourList from '../components/Featured-tours/FeaturedTourList';
import MasonaryImagesGallery from '../components/Image-gallery/MasonaryImagesGallery';
import Testimonials from "../components/Testimonial/Testimonials";
import Newsletter from '../shared/Newsletter';
import FlightBooking from '../components/FlightBooking/FlightBooking';

const Home = () => {
  return (
    <>
    <FlightBooking/>
      <section>
        <Container>
          <Row>
            <Col lg='6'>
              <div className='hero__content'>
                <div className='hero__subtitle d-flex align-items-center'>
                  <Subtitle subtitle={'Know Before You Go'} />
                  <img src={worldImg} alt='' /> {/* Fixed image source */}
                </div>
                <h1>
                  Traveling opens the door to creating <span className="highlight">memories</span>
                </h1>
                <p>
                Every journey is a chapter, every destination a story, 
                and every step a chance to discover a piece of yourself you never knew existed.
                </p>
              </div>
            </Col>

            <Col lg='2'>
              <div className="hero__img-box">
                <img src={heroImg} alt='' />
              </div>
            </Col>

            <Col lg='2'>
              <div className="hero__img-box hero_video-box mt-4">
                <video src={heroVideo} alt='' controls /> {/* Fixed video source */}
              </div>
            </Col>

            <Col lg='2'>
              <div className="hero__img-box mt-5">
                <img src={heroImg02} alt='' />
              </div>
            </Col>

            <SearchBar/>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="3">
            <h5 className='service__subtitle'>What we serve?</h5>
            <h2 className='services__title'>We offer our best services</h2>
            </Col>
            <ServiceList/>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12" className='mb-5'>
              <Subtitle subtitle={'Explore'} />
              <h2 className='featured__tour-title'>Our featured tours</h2>
            </Col>
            <FeaturedTourList/>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg="6">
            <div className='experience__content'>
              <Subtitle subtitle={'Experience'} />

              <h2>With our all exeperience <br/> we will serve you the best.</h2>
              <p>From planning to your return, we ensure every journey is smooth, memorable, and worry-free.
                <br/>
              
               </p>
            </div>

            <div className="counter__wrapper d-flex align-items-center gap-5">
              <div className="counter__box">
                <span>1k</span>
                <h6>Successfull trip</h6>
              </div>
              <div className="counter__box">
                <span>2K+</span>
                <h6>Regular Clients</h6>
              </div>
              <div className="counter__box">
                <span>5</span>
                <h6>Years exeperience</h6>
              </div>
            </div>
            </Col>
            <Col lg="6">
            <div className="experience__img">
              <img src={experienceImg} alt='' />
            </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12">
            <Subtitle subtitle={'Gallery'} />
            <h2 className='gallery__title'>
               Visit our customers tour gallery
            </h2>
            </Col>
            <Col lg='12'>
              <MasonaryImagesGallery/>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg='12'>
               <Subtitle subtitle={'Fans Love'} />
               <h2 className='testimonial__title'>What our fans say about us</h2>
                
            </Col>
            <Col lg='12'>
            <Testimonials />
            </Col>
          </Row>
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default Home; 
  