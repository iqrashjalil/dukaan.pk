import React from "react";
import contact1 from "../images/contact1.jpg";
import contact2 from "../images/contact2.jpg";
import "./AboutUs.css";
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const AboutUs = () => {
  const handleFacebookClick = () => {
    window.open("https://www.facebook.com/igiqrash1", "_blank");
  };

  const handleInstagramClick = () => {
    window.open("https://www.instagram.com/iqrashjalil/", "_blank");
  };

  const handleLinkedInClick = () => {
    window.open(
      "https://www.linkedin.com/in/iqrash-jalil-456895214/",
      "_blank"
    );
  };

  const handleGithubClick = () => {
    window.open("https://github.com/iqrashjalil", "_blank");
  };

  return (
    <section className="AboutUs-section">
      <div className="AboutUs-left">
        <h5>Discover Something Fascinating</h5>
        <h1>
          Get In Touch With Me
          <pre>
            I'm <span>Iqrash Jalil</span>
          </pre>
        </h1>
        <p>
          I am passionate about showcasing my skills and creating an exceptional
          online experience. With a background in [your field or expertise], I
          have developed this website to highlight my work and connect with
          like-minded individuals. Whether you have a question about my
          projects, need assistance with something, or just want to share your
          thoughts, I'm here to help. Feel free to reach out via email, phone,
          or through my social media channels, and I'll get back to you as soon
          as possible.
        </p>
      </div>
      <div className="AboutUs-right">
        <div className="AboutUs-photos">
          <img src={contact1} alt="" />
          <img src={contact2} alt="" />
        </div>
        <div className="AboutUs-socials">
          <div>
            <div onClick={handleFacebookClick} className="social">
              <FaFacebookF className="facebook" />
            </div>
            <div onClick={handleInstagramClick} className="social">
              <FaInstagram className="instagram" />
            </div>
          </div>
          <div>
            <div onClick={handleLinkedInClick} className="social">
              <FaLinkedinIn className="linkedin" />
            </div>
            <div onClick={handleGithubClick} className="social">
              <FaGithub className="github" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
