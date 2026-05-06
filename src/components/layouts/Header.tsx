import { Link } from "react-router-dom";

const Header = () => {
  const menus = [
    {
      path: "/orders",
      name: "Orders",
    },
  ];
  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-10">
            <div className="flex-shrink-0">
              <span className="text-xl font-extrabold text-blue-600 tracking-tight">
                ROFIK CAFE
              </span>
            </div>

            <div className="hidden md:flex items-center gap-6">
              {menus.map((val, i) => {
                return (
                  <Link
                    key={i}
                    className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
                    to={val.path}
                  >
                    {" "}
                    {val.name}{" "}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center">
            <button className="text-sm font-semibold text-red-600 hover:bg-red-50 px-4 py-2 rounded-md transition border border-red-200">
              Logout
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
