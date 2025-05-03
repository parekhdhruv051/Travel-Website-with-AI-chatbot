// ...other imports
import React, { useState, useContext } from 'react';
import './booking.css';
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../../Utils/config'; 

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Puducherry", "Andaman and Nicobar Islands",
  "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep"
];

const Booking = ({ tour, avgRating }) => {
  const { price, reviews, title, city } = tour;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const isIndianTour = city && indianStates.some(
    state => state.toLowerCase() === city.trim().toLowerCase()
  );

  const [trainType, setTrainType] = useState('sleeper');
  const [showQR, setShowQR] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [booking, setBooking] = useState({
    userId: user && user._id,
    userEmail: user && user.email,
    tourName: title,
    fullName: '',
    phone: '',
    guestSize: 1,
    bookAt: '',
  });

  const handleChange = e => {
    setBooking(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const serviceFee = 1;
  const trainCharge = isIndianTour && trainType === 'ac' ? 2000 : 0;
  const totalAmount = Number(price) * Number(booking.guestSize) + serviceFee + trainCharge;

  const handleClick = (e) => {
    e.preventDefault();
    if (!user) return alert("Please sign in");
    setShowQR(true);
  };

  const handleFinalBooking = async () => {
    if (isSubmitting) return;
  
    setIsSubmitting(true);
    const updatedBooking = {
      ...booking,
      paymentConfirmed: true // this tells the backend user has paid
    };
    if (isIndianTour) updatedBooking.trainType = trainType;
  
    try {
      const res = await fetch(`${BASE_URL}/booking`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(updatedBooking),
      });

      const result = await res.json();
      if (!res.ok) {
        alert(result.message);
        setIsSubmitting(false);
        return;
      }
  
      // ✅ Hide the QR and Button after successful booking
      setShowQR(false);
  
      // ✅ Navigate to thank- you page
      navigate("/thank-you");

    } catch (err) {
      alert("Booking failed");
      setIsSubmitting(false);
    }

  };  

  const upiUrl = `upi://pay?pa=virajrathva803@oksbi&pn=IndiaTravel&am=${totalAmount}&cu=INR&tn=Tour Booking for ${title}`;
  const qrCodeUrl = `https://quickchart.io/chart?cht=qr&chs=300x300&chl=${encodeURIComponent(upiUrl)}`;

  return (
    <div className='booking'>
      <div className='booking__top d-flex align-items-center justify-content-between'>
        <h3>₹ {price} <span>/per person</span></h3>
        <span className='tour__rating d-flex align-items-center'>
          <i className="ri-star-s-fill"></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      <div className='booking__form'>
        <h5>Information</h5>
        <Form className='booking__info-form' onSubmit={handleClick}>
          <FormGroup>
            <input type='text' placeholder='Full Name' id='fullName' required onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <input type='number' placeholder='Phone' id='phone' required onChange={handleChange} />
          </FormGroup>
          <FormGroup className='d-flex align-items-center gap-3'>
            <input type='date' id='bookAt' required onChange={handleChange} />
            <input type='number' id='guestSize' placeholder='Guests' required onChange={handleChange} />
          </FormGroup>

          {isIndianTour && (
            <FormGroup>
              <select className="form-control" value={trainType} onChange={(e) => setTrainType(e.target.value)}>
                <option value="sleeper">Sleeper Train (No extra cost)</option>
                <option value="ac">AC Train (+₹2000)</option>
              </select>
            </FormGroup>
          )}

          <Button className='btn primary__btn w-100 mt-4' type="submit">Book Now</Button>
        </Form>

        {showQR && (
          <div className="qr__section mt-4 text-center">
            <h5>Scan & Pay with GPay / PhonePe / Paytm</h5>
            <img
              src={qrCodeUrl}
              alt="UPI QR Code"
              style={{ width: '300px', height: '300px', marginBottom: '1rem' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/300?text=QR+Code+Unavailable";
              }}
            />
            <p>UPI ID: <strong>virajrathva803@oksbi</strong></p>
            <p>Amount: ₹{totalAmount}</p>
            <Button
              className='btn success__btn mt-3'
              onClick={handleFinalBooking}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "✅ I Have Paid"}
            </Button>
          </div>
        )}
      </div>

      <div className='booking__bottom'>
        <ListGroup>
          <ListGroupItem className='border-0 px-0'>
            <h5 className='d-flex align-items-center gap-1'>
              ₹ {price} <i className='ri-close-line'></i> {booking.guestSize} person(s)
            </h5>
            <span>₹ {price * booking.guestSize}</span>
          </ListGroupItem>

          {isIndianTour && (
            <ListGroupItem className='border-0 px-0'>
              <h5>Train Type</h5>
              <span>{trainType === 'ac' ? '₹ 2000 (AC Train)' : '₹ 0 (Sleeper Train)'}</span>
            </ListGroupItem>
          )}

          <ListGroupItem className='border-0 px-0'>
            <h5>Service Fee</h5>
            <span>₹ {serviceFee}</span>
          </ListGroupItem>

          <ListGroupItem className='border-0 px-0 total'>
            <h5>Total</h5>
            <span>₹ {totalAmount}</span>
          </ListGroupItem>
        </ListGroup>
      </div>
    </div>
  );
};

export default Booking;
