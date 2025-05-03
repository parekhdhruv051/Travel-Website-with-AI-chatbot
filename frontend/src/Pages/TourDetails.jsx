// ...imports
import React, { useEffect, useRef, useState, useContext } from 'react';
import '../styles/tour-details.css';
import { Container, Row, Col, Form, ListGroup } from 'reactstrap';
import { useParams } from 'react-router-dom';
import calculateAvgRating from '../Utils/avgRating';
import avatar from "../assets/images/avatar.jpg";
import Booking from '../components/Booking/Booking';
import Newsletter from '../shared/Newsletter';
import useFetch from './../hooks/useFetch';
import { BASE_URL } from './../Utils/config';
import { AuthContext } from '../components/context/AuthContext';

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Puducherry", "Andaman and Nicobar Islands",
  "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep"
];

const ToggleSection = ({ title, data, isObject = false }) => (
  <div className={`${title.toLowerCase().replace(/\s/g, '-')}-content mt-3`}>
    <h5>{title}</h5>
    <ul>
      {data?.map((item, index) => {
        if (isObject) {
          const bulletPoints = Array.isArray(item?.description)
            ? item.description
            : (typeof item?.description === 'string'
              ? item.description.split('•').filter(Boolean)
              : []);

          return (
            <li key={index}>
              <strong>Day {item?.day || index + 1}:</strong>
              <ul>
                {bulletPoints.map((point, i) => (
                  <li key={i}>{point.trim()}</li>
                ))}
              </ul>
            </li>
          );
        }

        return <li key={index}>{item}</li>;
      })}
    </ul>
  </div>
);

const TourDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef('');
  const [tourRating, setTourRating] = useState(null);
  const { user } = useContext(AuthContext);
  const [toggles, setToggles] = useState({
    itinerary: false,
    inclusions: false,
    exclusions: false,
    highlights: false,
    activities: false,
    thingsToCarry: false,
  });

  const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);

  useEffect(() => {
    if (tour) window.scrollTo(0, 0);
  }, [tour]);

  if (!tour) return <h2>Tour not found</h2>;

  const {
    photo, title, desc, price, address, reviews,
    city, distance, maxGroupSize, itinerary, inclusions,
    exclusions, highlights, activities, thingsToCarry
  } = tour;

  const { totalRating, avgRating } = calculateAvgRating(reviews);
  const isIndianTour = city && indianStates.some(
    state => state.toLowerCase() === city.trim().toLowerCase()
  );
  const options = { day: 'numeric', month: 'long', year: 'numeric' };

  const toggleSection = section => {
    setToggles(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const submitHandler = async e => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;
    if (!user) return alert('Please sign in');

    try {
      const res = await fetch(`${BASE_URL}/review/${id}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          username: user.username,
          reviewText,
          rating: tourRating
        })
      });

      const result = await res.json();
      if (!res.ok) return alert(result.message);
      alert(result.message);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <section>
        <Container>
          {loading && <h4 className='text-center pt-5'>Loading...</h4>}
          {error && <h4 className='text-center pt-5'>{error}</h4>}
          {!loading && !error && (
            <Row>
              <Col lg='8'>
                <div className="tour__content">
                  <img src={photo} alt='' />
                  <div className='tour__info'>
                    <h2>{title}</h2>
                    <div className='d-flex align-items-center gap-5 flex-wrap'>
                      <span className='tour__rating d-flex align-items-center gap-1'>
                        <i className="ri-star-s-fill" style={{ color: "var(--secondary-color)" }}></i>
                        {avgRating || 'No rating'}
                        {totalRating > 0 && <span>({reviews?.length})</span>}
                      </span>
                      <div className='d-flex align-items-center gap-2 flex-wrap'>
                        <span>
                          <i className='ri-map-pin-user-fill'></i>{' '}
                          <a href={`https://www.google.com/maps?q=${encodeURIComponent(address)}`} target="_blank" rel="noopener noreferrer">
                            {address}
                          </a>
                        </span>
                      </div>
                    </div>

                    {/* Tour Details Based on Location */}
                    {isIndianTour ? (
                      <>
                        <div className="mt-3 d-flex flex-wrap gap-2">
                          {['itinerary', 'inclusions', 'exclusions', 'highlights', 'activities', 'thingsToCarry'].map(section => (
                            <button
                              key={section}
                              className='btn btn-outline-secondary'
                              onClick={() => toggleSection(section)}
                            >
                              {toggles[section] ? `Hide ${section}`.replace(/([A-Z])/g, ' $1') : `View ${section}`.replace(/([A-Z])/g, ' $1')}
                            </button>
                          ))}
                        </div>

                        <div className="mt-3 d-flex flex-column gap-2">
                          {toggles.itinerary && <ToggleSection title="Itinerary" data={itinerary} isObject />}
                          {toggles.inclusions && <ToggleSection title="Inclusions" data={inclusions} />}
                          {toggles.exclusions && <ToggleSection title="Exclusions" data={exclusions} />}
                          {toggles.highlights && <ToggleSection title="Highlights" data={highlights} />}
                          {toggles.activities && <ToggleSection title="Activities" data={activities} />}
                          {toggles.thingsToCarry && <ToggleSection title="Things to Carry" data={thingsToCarry} />}
                        </div>
                      </>
                    ) : (
                      <div
                        className="international-note mt-4"
                        style={{
                          backgroundColor: "#fff3cd",
                          padding: "1rem",
                          borderRadius: "8px",
                          border: "1px solid #ffeeba"
                        }}
                      >
                        <strong>Note:</strong> This is an international tour.
                        <br />
                        For detailed itinerary and travel requirements, please contact us at{' '}
                        <a href="mailto:travelworldnew07@gmail.com">travelworldnew07@gmail.com</a> or call{' '}
                        <strong>+91-9099139966</strong>.
                      </div>
                    )}

                    <div className="tour__extra-details mt-4">
                      <span>₹ {price} /person</span>
                      <span><i className='ri-map-pin-time-line'></i> {distance} Km</span>
                      <span><i className='ri-group-line'></i> {maxGroupSize} people</span>
                    </div>

                    <h5 className='mt-4'>Description</h5>
                    <p>{desc}</p>
                  </div>

                  {/* Reviews Section */}
                  <div className="tour__reviews mt-4">
                    <h4>Reviews ({reviews?.length})</h4>
                    <Form onSubmit={submitHandler}>
                      <div className='d-flex align-items-center gap-3 mb-4 rating__group'>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} onClick={() => setTourRating(star)}>
                            {star} <i className='ri-star-s-fill'></i>
                          </span>
                        ))}
                      </div>
                      <div className='review__input'>
                        <input type="text" ref={reviewMsgRef} placeholder='Share your thoughts' required />
                        <button className='btn primary__btn text-white' type='submit'>Submit</button>
                      </div>
                    </Form>
                    <ListGroup className='user__reviews mt-3'>
                      {reviews?.map((review, index) => (
                        <div className='review__item' key={index}>
                          <img src={avatar} alt='' />
                          <div className="w-100">
                            <div className='d-flex align-items-center justify-content-between'>
                              <div>
                                <h5>{review.username}</h5>
                                <p>{new Date(review.createdAt).toLocaleDateString("en-US", options)}</p>
                              </div>
                              <span className='d-flex align-items-center'>
                                {review.rating}<i className='ri-star-s-fill'></i>
                              </span>
                            </div>
                            <h6>{review.reviewText}</h6>
                          </div>
                        </div>
                      ))}
                    </ListGroup>
                  </div>
                </div>
              </Col>

              <Col lg='4'>
                <Booking tour={tour} avgRating={avgRating} />
              </Col>
            </Row>
          )}
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default TourDetails;
