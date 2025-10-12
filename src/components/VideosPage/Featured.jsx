
import { useEffect, useState } from "react";
import axios from "axios";
const Featured = () => {
     const [schedule, setSchedule] = useState(null);
   useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const res = await axios.get("https://amh.backend.paxcatholictv.org/streams/2");
        setSchedule(res.data);
      } catch (error) {
        console.error("Failed to fetch schedule:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSchedule();
  }, []);
    if (!schedule) {
    return (
      <section className="relative max-w-[1280px] mx-auto mt-20 px-6">
        <p className="text-center text-red-500">ትንሽ ይጠብቁ .</p>
      </section>
    );
  }
  return(
    <>
        <div className="text-center mb-12 px-6">
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-wide">
        ቪዲዮዎች
      </h2>
    </div>
  <section className="relative max-w-[1280px] mx-auto mt-20 px-6">
    {/* Background Image */}
       <div
        className="h-[460px] rounded-xl shadow-lg bg-cover bg-center bg-no-repeat"
        aria-hidden="true"
        style={{ backgroundImage: `url(${schedule.st_image})` }}
      />

    {/* <div
      className="h-[460px] rounded-xl shadow-lg bg-[url('assets/images/httpswwwpexelscomphotoamanandwomanwearingangelcostumes8513040.png')] bg-cover bg-center bg-no-repeat"
      aria-hidden="true"
    /> */}

    {/* Gradient overlay block with text inside */}
    <div
      className="absolute top-0 left-0 h-[400px] w-[430px] rounded-xl bg-[#003366] opacity-90 shadow-xl p-8 flex flex-col justify-center text-white font-['Roboto_Condensed']"
      style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
    >


      {/* Text Content */}
      <div className="space-y-5">
        <p className="uppercase text-xs font-bold tracking-widest text-blue-400">
          {/* Upcoming Program */}
        </p>

        <h2 className="uppercase font-extrabold text-3xl leading-tight tracking-tight drop-shadow-md">
          {/* Watch and Listen to Our Sermons */}
          {schedule.st_title}
          {}
        </h2>

        <p className="text-lg font-medium leading-relaxed text-gray-300">
          {/* Upcoming Sunday Sermon */}
          {schedule.st_body}

        </p>

        {/* <div className="flex items-baseline space-x-4">
          <p className="text-5xl font-extrabold uppercase drop-shadow-lg">
            20
          </p>
          <p className="uppercase text-xl font-semibold text-blue-300 tracking-wide">
            JULY
          </p>
        </div> */}

        {/* <address className="not-italic text-lg leading-6 text-gray-200">
          Anbessa Garage,
          <br />
          Addis Ababa,
          <br />
          Ethiopia
        </address> */}

        <p className="text-lg leading-6 text-gray-300">
          {schedule.st_cn}
          {/* Sunday 23:39 L.T &nbsp;&nbsp; Monday 11:20 L.T */}
        </p>
          {/* Button */}
      {/* <button
        type="button"
        className="mb-8 px-8 py-3 rounded-lg font-semibold uppercase tracking-wider bg-gradient-to-br from-[#003366] to-[#000000] hover:from-[#002244] hover:to-[#111111] transition-colors duration-300 shadow-lg shadow-black/50"
        style={{ letterSpacing: '0.1em' }}
      >
        Watch
      </button> */}
          <a
            href={schedule.st_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-8 inline-block px-8 py-3 rounded-lg font-semibold uppercase tracking-wider bg-gradient-to-br from-[#003366] to-[#000000] hover:from-[#002244] hover:to-[#111111] transition-colors duration-300 shadow-lg shadow-black/50"
            style={{ letterSpacing: "0.1em" }}
          >
            ይመልከቱ
          </a>
      </div>
    </div>
  </section>
  </>
);
}
export default Featured;
