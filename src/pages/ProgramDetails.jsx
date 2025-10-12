
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NewsHero from "../components/ProgramDetails/ProgramsHero";
import NewsBody from "../components/ProgramDetails/ProgramsBody";
import Navbar from "../components/Aboutus/Navbar";
import { Link } from "react-router-dom";

const ProgramDetails = () => {
  const { id } = useParams(); // 👈 dynamic ID from the route
  const [newsData, setNewsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(`https://amh.backend.paxcatholictv.org/scheduele/${id}`); // 👈 Replaces hardcoded 18
        setNewsData(res.data);
      } catch (err) {
        console.error("Failed to fetch news:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  if (loading) return <p className="text-white text-center mt-10">Loading...</p>;
  if (!newsData) return <p className="text-white text-center mt-10">News not found.</p>;

  return (
    <div className="bg-white min-h-screen w-full font-['Roboto_Condensed']">
      <Navbar />
      {/* <NewsHero data={newsData} /> */}
      <NewsBody data={newsData} />


    </div>
  );
};

export default ProgramDetails;
