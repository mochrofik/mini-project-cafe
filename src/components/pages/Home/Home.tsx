import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMenu } from "../../../services/menu.service";
import { useState } from "react";
import type { IMenuItem, IMenuResponse } from "../../../types/menu";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const Home = () => {
  const [filter, setfilter] = useState("All");
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const { data } = useQuery<IMenuResponse>({
    queryKey: ["menu", filter],
    queryFn: async () => {
      return await getMenu(1, 25, filter == "All" ? undefined : filter);
    },
  });

  const filteredMenu = data?.data;

  const categories = ["All", "Coffee", "Non-Coffe", "Pastries", "Desserts"];

  return (
    <div>
      <nav className="bg-white p-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-row items-center justify-between">
          {/* LOGO */}
          <div className="flex items-center px-2 text-emerald-900 text-lg font-poppins font-bold italic">
            <Link to={"/"}>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-gray-900 tracking-tight leading-none">
                  R<span className="text-[#4C8CE4]">Cafe</span>
                </span>
              </div>
            </Link>
          </div>

          {/* DESKTOP MENU (Tampil di layar md ke atas) */}
          <div className="hidden md:flex ml-10 gap-8 items-center font-medium">
            <a
              href="#home"
              className="hover:text-emerald-500 transition-colors"
            >
              Home
            </a>
            <a
              href="#menu"
              className="hover:text-emerald-500 transition-colors"
            >
              Menu
            </a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to={"/login"}>
                <div className="bg-emerald-500 transition shadow-lg shadow-emerald-100 hover:bg-emerald-600 text-white font-bold py-2 px-6 rounded-full">
                  Login
                </div>
              </Link>
            </motion.button>
          </div>

          {/* MOBILE TOGGLE BUTTON (Hanya tampil di layar kecil) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-900 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* MOBILE OVERLAY / MODAL MENU */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t overflow-hidden"
            >
              <div className="flex flex-col p-4 space-y-4 items-center">
                <a
                  href="#home"
                  onClick={toggleMenu}
                  className="w-full text-center py-2 text-lg"
                >
                  Home
                </a>
                <a
                  href="#menu"
                  onClick={toggleMenu}
                  className="w-full text-center py-2 text-lg"
                >
                  Menu
                </a>
                <Link to="/login" onClick={toggleMenu} className="w-full">
                  <div className="bg-emerald-500 text-center text-white font-bold py-3 rounded-xl shadow-md">
                    Login
                  </div>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      <motion.section
        id="home"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 2.2 }}
        className="w-full bg-stone-50 overflow-hidden scroll-mt-10"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          {/* Sisi Kiri - Teks */}
          <div className="w-full md:w-1/2 p-10 md:p-16 xl:p-24 space-y-6 text-center md:text-left">
            <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-full uppercase tracking-widest">
              Est. 2026
            </span>
            <h1 className="text-5xl md:text-6xl font-serif font-extrabold text-stone-900 leading-tight">
              R Cafe, <br />
              The True Story.
            </h1>
            <p className="text-lg text-stone-600 max-w-md mx-auto md:mx-0">
              Find enjoy place.
            </p>
            <div className="flex gap-4 pt-4 justify-center md:justify-start">
              <motion.a
                href="#menu"
                className="px-8 py-3.5 bg-emerald-600 text-white rounded-full font-bold hover:bg-emerald-700 transition shadow-lg shadow-emerald-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1.3 }}
              >
                See Menus
              </motion.a>
            </div>
          </div>

          {/* Sisi Kanan - Gambar */}
          <div className="w-full md:w-1/2 h-[400px] md:h-[650px] relative">
            <img
              src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop"
              alt="Hero Kopi"
              className="object-cover object-center"
            />
          </div>
        </div>
      </motion.section>
      <motion.section
        id="menu"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }} // Animasi mulai sedikit sebelum section full muncul
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto p-6">
          {/* Category Filter */}
          <div className="flex gap-3 mb-8 overflow-x-auto pb-2 p-10">
            {categories.map((cat: any, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-full font-medium transition-all whitespace-nowrap ${
                  filter === cat
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
                onClick={async () => {
                  setfilter(cat);
                }}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredMenu &&
              filteredMenu!.length > 0 &&
              filteredMenu!.map((item: IMenuItem) => (
                <div
                  key={item.id}
                  className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                >
                  {/* Image Container */}
                  <div className="relative h-45 w-full overflow-hidden">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-emerald-600 transition-colors">
                        {item.name}
                      </h3>
                    </div>

                    <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-1">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between mt-auto border-t border-gray-50">
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                          Price
                        </p>
                        <p className="text-xl font-black text-gray-900">
                          ${item.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
