import { useQuery } from "@tanstack/react-query";
import Header from "../../layouts/Header";
import CardUI from "../../ui/Card";
import { useState } from "react";
import { getMenu } from "../../../services/menu.service";
import type { IMenuItem, IMenuResponse } from "../../../types/menu";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import Input from "../../ui/Input";

const CreateOrder = () => {
  const [filter, setfilter] = useState("All");
  const { data } = useQuery<IMenuResponse>({
    queryKey: ["menu", filter],
    queryFn: async () => {
      return await getMenu(1, 25, filter == "All" ? undefined : filter);
    },
  });

  const filteredMenu = data?.data;

  const categories = ["All", "Coffee", "Non-Coffe", "Pastries", "Desserts"];

  return (
    <main className="h-screen bg-slate-50">
      <Header />

      <div className="flex flex-col p-6 md:p-10 lg:p-20 gap-5">
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <div className="mb-6">
            <div>
              <h1 className="font-bold"> Create Order</h1>
              <p className="text-slate-500 text-sm">Our menu</p>

              <div>
                <div className="flex gap-3 mb-8 mt-5 overflow-x-auto ">
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
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row  gap-4">
          <div className="basis-full">
            <CardUI id="menu">
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
                {filteredMenu &&
                  filteredMenu!.length > 0 &&
                  filteredMenu!.map((item: IMenuItem) => (
                    <div
                      key={item.id}
                      className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                    >
                      {/* Image Container */}
                      <div className="relative h-52 w-full overflow-hidden">
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

                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                          <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                              Price
                            </p>
                            <p className="text-xl font-black text-gray-900">
                              ${item.price}
                            </p>
                          </div>

                          <button className="p-3 bg-emerald-500 text-white rounded-2xl hover:bg-emerald-600 transition-colors shadow-md shadow-emerald-200 active:scale-95">
                            <ShoppingCart
                              onClick={() => {}}
                              className="cursor-pointer w-5 h-5"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardUI>
          </div>
          <div className="basis-xl">
            <CardUI id="menu">
              <div>
                <h1 className="font-bold text-2xl">Order Summary</h1>

                <div className="bg-slate-50 rounded-lg p-3 mt-3 gap-3 flex flex-col">
                  <Input
                    label="Name"
                    placeholder="Enter your name"
                    id="name"
                    name="name"
                  />
                  <Input
                    type="number"
                    label="Table Number"
                    name="table-number"
                    id="table-number"
                    placeholder="Enter your table number"
                  />
                </div>

                <h2 className="font-bold my-3">Order Items</h2>
              </div>
            </CardUI>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CreateOrder;
