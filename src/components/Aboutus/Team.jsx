import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Team = () => {
  const [sermons, setSermons] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllSermons = async () => {
      try {
        const res = await axios.get('https://amh.backend.paxcatholictv.org/team');
        setSermons(res.data);
      } catch (err) {
        console.error('Error fetching sermons:', err);
      }
    };
    fetchAllSermons();
  }, []);

  const repeatedSermons = [...sermons, ...sermons];
  const cardWidthRem = 18; // 18rem width per card (from your inline style)
  const remToPx = 16; // 1rem approx 16px
  const cardWidthPx = cardWidthRem * remToPx;

  const slideCount = sermons.length;

  const scrollToIndex = (index) => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: index * cardWidthPx,
        behavior: "smooth",
      });
    }
  };

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slideCount);
      scrollToIndex((currentIndex + 1) % slideCount);
    }, 3000);

    return () => resetTimeout();
  }, [currentIndex, slideCount]);

  const handleNext = () => {
    resetTimeout();
    const newIndex = (currentIndex + 1) % slideCount;
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const handlePrev = () => {
    resetTimeout();
    const newIndex = (currentIndex - 1 + slideCount) % slideCount;
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const handleReadMore = (id) => {
    navigate(`/programdetail/${id}`);
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 rounded-3xl shadow-xl relative overflow-hidden">
      <h2
        className="text-5xl font-extrabold uppercase text-center mb-14 text-[#00475e] tracking-widest drop-shadow-md"
        style={{ fontFamily: "Roboto Condensed" }}
      >
        አስደናቂ ቡድናችንን ይተዋወቁ
      </h2>
      <p
        className="text-center uppercase text-xl mb-20 text-[#006a8c] font-semibold tracking-wide"
        style={{ fontFamily: "Roboto Condensed" }}
      >
        የፓክስ ቤተሰቦች
      </p>

      <div className="relative overflow-hidden">
        <div
          ref={sliderRef}
          className="flex gap-10"
          style={{ width: `${repeatedSermons.length * cardWidthRem}rem`, scrollBehavior: "smooth" }}
        >
          {repeatedSermons.map(({ full_name, position, image }, index) => (
            <div
              key={index}
              onClick={() => handleReadMore(sermons[index % sermons.length]?._id)}
              className="bg-gradient-to-br from-white to-[#e9f1f8] rounded-3xl p-8 w-72 flex flex-col items-center shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-500 cursor-pointer"
            >
              <div
                className="h-40 w-40 rounded-full border-8 border-white bg-cover bg-center mb-8 shadow-xl"
                style={{
                  backgroundImage: `url(${image})`,
                  boxShadow:
                    "0 10px 20px rgba(0, 0, 0, 0.1), inset 0 0 15px rgba(0, 0, 0, 0.05)",
                }}
                aria-label={`${full_name} profile picture`}
              ></div>

              <h3
                className="text-3xl font-extrabold uppercase mb-3 text-center text-[#00475e]"
                style={{ fontFamily: "Roboto Condensed" }}
              >
                {full_name}
              </h3>

              <p
                className="text-lg opacity-90 mb-6 text-center text-yellow-500"
                style={{ fontFamily: "Roboto Condensed" }}
              >
                {position}
              </p>
            </div>
          ))}
        </div>

        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-[#e4ac43] text-black p-2 rounded-full shadow-md z-10 hover:bg-yellow-600 transition"
          aria-label="Previous"
        >
          &#8592;
        </button>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-[#e4ac43] text-black p-2 rounded-full shadow-md z-10 hover:bg-yellow-600 transition"
          aria-label="Next"
        >
          &#8594;
        </button>
      </div>
    </section>
  );
};

export default Team;
