import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import aboutImage from '../../assets/images/about-image.jpg';  // Add your image path here
import "./about.css";

    

const About = () => {
  return (
    <section className="about-section">
      <Container>
        <Row className="align-items-center">
          <Col md="6">
            <img src={aboutImage} alt="Adventure" className="img-fluid" />
          </Col>
          <Col md="6">
            <h2>We Help You Plan Your Journey</h2>
            <p>
              Welcome to TravelWorld, where adventure meets camaraderie! We're not just a travel company; we're a community of spirited explorers who believe in the transformative power of the great outdoors. Our passion for adventure drives us to curate exhilarating camping experiences that ignite the senses and create lifelong memories.
            </p>
            <p>
              Founded on the principle of embracing the wild and fostering connections, TravelWorld is committed to providing inclusive and accessible adventures for all. Whether you're a seasoned outdoor enthusiast or a curious first-timer, there's a place for you in our vibrant community.
            </p>
            <p>
              We pride ourselves on crafting immersive itineraries that go beyond the typical tourist trail. From remote wilderness excursions to adrenaline-pumping outdoor activities, each trip is designed to push boundaries and expand horizons. But our adventures aren't just about adrenaline; they're about forging friendships, gaining perspective, and leaving a positive impact on the places we visit.
            </p>
            <p>
              In collaboration with local experts and communities, we strive to ensure that our adventures are not only thrilling but also sustainable and respectful of the environment and cultures we encounter. By supporting local businesses and initiatives, we aim to leave a lasting legacy of responsible travel.
            </p>
            <p>
              So, whether you're seeking an epic trek through rugged landscapes or a tranquil night under the stars, TravelWorld invites you to join us on a journey of discovery and adventure. Pack your sense of adventure and get ready to experience the world in a whole new way!
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;
