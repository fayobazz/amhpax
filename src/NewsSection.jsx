import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const NewsSection = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get('https://amh.backend.paxcatholictv.org/posts');
        setBooks(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAllBooks();
  }, []);

  const repeatedBooks = [...books, ...books];

  const handleReadMore = (id) => {
    navigate(`/news/${id}`);
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 340; // Adjust for card width + gap
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      scroll('right');
    }, 3000); // Slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-[#003366] text-white py-24 px-6 overflow-hidden font-['Roboto_Condensed']">
      <div className="text-center mb-16">
        <p className="uppercase text-sm tracking-widest mb-2 text-gray-300">ትኩስ ዜናዎች</p>
        <h2 className="text-5xl font-extrabold uppercase text-white drop-shadow-xl">ዜናዎች</h2>
      </div>

      <div className="relative">
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#e4ac43] text-black p-3 rounded-full z-10 hover:bg-[#f1c859] transition"
          onClick={() => scroll('left')}
        >
          <ChevronLeft size={24} />
        </button>

        <div ref={scrollRef} className="flex gap-10 overflow-x-auto scroll-smooth no-scrollbar">
          {repeatedBooks.map((book, index) => {
            const bookId = book._id || book.id;
            return (
              <Link
                key={`${bookId}-${index}`}
                to={`/news/${bookId}`}
                className="relative min-w-[320px] max-w-[320px] h-96 rounded-2xl overflow-hidden shadow-xl bg-cover bg-center group transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl"
                style={{ backgroundImage: `url(${book.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#003366cc] via-black/50 to-transparent z-0" />
                <div className="absolute bottom-0 left-0 right-0 p-5 z-10 backdrop-blur-lg bg-white/10 rounded-t-xl text-white">
                  <h2 className="text-xl font-bold uppercase mb-1 truncate">{book.title}</h2>
                  <p className="text-sm line-clamp-2">{book.body}</p>
                  <p className="text-xs italic mt-2 opacity-80">አዘጋጅ : {book.created_by}</p>
                  <button
                    onClick={() => handleReadMore(bookId)}
                    className="mt-4 inline-block bg-[#E4AC43] text-black text-sm font-semibold px-4 py-2 rounded hover:bg-yellow-600 transition"
                  >
                    ተጨማሪ ያንብቡ
                  </button>
                </div>
              </Link>
            );
          })}
        </div>

        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#e4ac43] text-black p-3 rounded-full z-10 hover:bg-[#f1c859] transition"
          onClick={() => scroll('right')}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="text-center mt-16">
        <Link
          to="/news"
          className="inline-block px-8 py-4 bg-[#e4ac43] text-black text-base font-bold uppercase tracking-wider rounded-xl hover:bg-[#f1c859] transition-colors shadow-md"
        >
          ሁሉም ዜናዎች
        </Link>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default NewsSection;
