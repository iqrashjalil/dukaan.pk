import React, { useState } from "react";
import contactus from "../images/contactus.webp";
import "./contactus.css";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
const ContactUs = () => {
  const [formData, setFormData] = useState({
    to_name: "Iqrash Jalil",
    from_name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_7qu6v3a", 
        "template_top2a0k", 
        {
          to_name: formData.to_name,
          from_name: formData.from_name,
          message: formData.message, 
          reply_to: formData.email, 
        },
        "iDVXAkl92iyqWU4Aq" 
      )
      .then((response) => {
        toast.success("Message sent successfully!");
        setFormData({
          to_name: "Iqra",
          from_name: "",
          email: "",
          message: "",
        });
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <section className="contactUs">
      <div className="contactUs-left">
        <img src={contactus} alt="" />
      </div>
      <div className="contactUs-right">
        <h1>Let's Connect</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="from_name">Name:</label>
          <br />
          <input
            className="input-field"
            type="text"
            id="from_name"
            name="from_name"
            value={formData.from_name}
            onChange={handleChange}
            required
          />
          <br />
          <br />
          <label htmlFor="email">Email:</label>
          <br />{" "}
          <input
            className="input-field"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <br />
          <br />
          <label htmlFor="message">Message:</label>
          <br />
          <textarea
            className="input-field"
            id="message"
            name="message"
            rows="4"
            cols="50"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <br />
          <br />
          <input
            className="button-contact"
            type="submit"
            value="Send Message"
          />
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
