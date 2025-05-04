import React, { useRef, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import emailjs from "emailjs-com";
import maleTourist from "../assets/images/male-tourist.png";
import "./newsletter.css";

const Newsletter = () => {
  const form = useRef();
  const [messageShown, setMessageShown] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    // Step 1: Show Thank You immediately
    setMessageShown(true);

    // Step 2: Then send the email in the background
    emailjs
    .sendForm(
      "service_81dbj3g",
      "template_fulsku9",
      form.current,
      "Uk92ZDGm17PKpu5c1"
    )
      .then(
        (result) => {
          console.log(result.text);
          // You can optionally show another message if you want when it actually succeeds
        },
        (error) => {
          console.log(error.text);
          alert("Oops! Something went wrong. Please try again.");
        }
      );

    e.target.reset();
  };

  return (
    <section className="newsletter">
      <Container>
        <Row>
          <Col lg="6">
            <div className="newsletter__content">
              <h2>Subscribe now to get useful traveling information</h2>
              {!messageShown ? (
                <form ref={form} onSubmit={sendEmail}>
                  <div className="newsletter__input">
                    <input
                      type="email"
                      name="email" // ✅ CORRECT
                      placeholder="Enter your email"
                      required
                    />

                    <button type="submit" className="newsletter__btn">
                      Subscribe
                    </button>
                  </div>
                </form>
              ) : (
                <h4 style={{ color: "green", marginTop: "20px" }}>
                  Thank you for subscribing! 🎉
                </h4>
              )}
              <p>
              Get expert travel tips, destination guides, and exclusive deals delivered to your inbox!
              </p>
            </div>
          </Col>

          <Col lg="6">
            <div className="newsletter__img">
              <img src={maleTourist} alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Newsletter;