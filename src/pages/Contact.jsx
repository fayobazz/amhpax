import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import Footer from "../Footer";

const Contact = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { fullName, email, subject, message } = formData;

    if (!fullName || !email || !subject || !message) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    emailjs
      .sendForm(
        "service_7b30v97",
        "template_nfk88r7",
        formRef.current,
        "303YVko4M0RVbgUXi"
      )
      .then(
        () => {
          alert("Message sent successfully!");
          setFormData({
            fullName: "",
            email: "",
            subject: "",
            message: "",
          });
        },
        (error) => {
          console.error("FAILED...", error.text);
          alert("Something went wrong. Please try again.");
        }
      );
  };

  return (
    <div className="min-h-screen text-white font-['Roboto_Condensed'] flex flex-col pt-20 bg-gradient-to-br from-[#001f3f] via-[#003366] to-[#002244]">
      {/* Hero Section */}
      <section
        className="relative w-full h-[480px] bg-cover bg-center flex flex-col justify-center items-start px-6 md:px-16 pt-2 overflow-hidden max-w-[1200px] mx-auto"
        style={{
          backgroundImage:
            "url(assets/images/httpsunsplashcomphotos6liebveafry.png)",
        }}
      >
        <p className="mb-2 text-[#ffd1a3] uppercase font-semibold text-lg tracking-wider drop-shadow-lg">
          ይግኙን
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold uppercase leading-tight max-w-2xl drop-shadow-xl">
          ከቤተ ክርስትያናችን ጋር ይገናኙ!
        </h1>
        <p className="mt-4 text-lg opacity-80 max-w-xl">
          ጥያቄዎች ለመቅበል ፣ አብረን ለመጸለይ እና ለማንኛውም ጉዳይ ያግኙን
        </p>

        {/* Decorative shapes */}
        <div className="absolute top-8 left-8 w-20 h-20 bg-yellow-400 opacity-20 rounded-full filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-16 right-16 w-28 h-28 border-4 border-yellow-400 opacity-30 rounded-full animate-spin-slow"></div>
      </section>

      {/* Contact Section */}
      <main className="flex flex-wrap justify-center gap-10 px-6 md:px-16 py-16 max-w-[1200px] mx-auto">
        {/* Contact Form */}
        <form
          ref={formRef}
          className="flex flex-col gap-5 flex-1 min-w-[320px] max-w-[560px] bg-white bg-opacity-10 rounded-xl p-8 backdrop-blur-md shadow-2xl"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold uppercase mb-4 text-yellow-400">
            መልዕክት ይላኩልን
          </h2>

          <label className="flex flex-col gap-1 text-white text-sm font-medium">
            ሙሉ ስም
            <input
              type="text"
              name="fullName"
              placeholder="ሙሉ ስም"
              value={formData.fullName}
              onChange={handleChange}
              className="rounded-md p-3 bg-white bg-opacity-90 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black"
              required
            />
          </label>

          <label className="flex flex-col gap-1 text-white text-sm font-medium">
            ኢሜይል
            <input
              type="email"
              name="email"
              placeholder="example@mail.com"
              value={formData.email}
              onChange={handleChange}
              className="rounded-md p-3 bg-white bg-opacity-90 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black"
              required
            />
          </label>

          <label className="flex flex-col gap-1 text-white text-sm font-medium">
            ስልክ ቁጥር
            <input
              type="text"
              name="subject"
              placeholder="ስልክ ቁጥር"
              value={formData.subject}
              onChange={handleChange}
              className="rounded-md p-3 bg-white bg-opacity-90 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black"
              required
            />
          </label>

          <label className="flex flex-col gap-1 text-white text-sm font-medium">
            መልዕክት
            <textarea
              name="message"
              rows="4"
              placeholder="Write your message here..."
              value={formData.message}
              onChange={handleChange}
              className="rounded-md p-3 bg-white bg-opacity-90 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none text-black"
              required
            />
          </label>

          <button
            type="submit"
            className="bg-[#e4ac43] text-[#1c1d28] uppercase font-bold text-sm py-3 rounded-lg hover:bg-yellow-500 transition"
          >
            ይላኩ
          </button>
        </form>

        {/* Contact Info */}
        <aside className="flex flex-col gap-8 flex-1 min-w-[280px] max-w-[480px] text-white">
          <div>
            <h2 className="text-[24px] uppercase font-bold tracking-wide mb-4">
              በዚህ ያግኙን :
            </h2>
            <p className="mb-3 text-sm opacity-90">
              📍 አድራሻ: Anbessa Garage Addis Ababa, Ethiopia
            </p>
            <p className="mb-3 text-sm opacity-90">
              📞 ስልክ: +251 911 234 567
            </p>
            <p className="mb-3 text-sm opacity-90">
              📧 ኢሜይል: info@paxctv.org
            </p>
          </div>
        </aside>
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default Contact;
