import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../services/auth.service";

const Header = () => {
  const navigate = useNavigate();
  const menus = [
    {
      path: "/orders",
      name: "Orders",
    },
  ];

  const handleLogout = async () => {
    await logout();

    return navigate("/login", { replace: true });
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-10">
            <div className="flex flex-col">
              <span className="text-2xl font-black text-gray-900 tracking-tight leading-none">
                R<span className="text-[#4C8CE4]">Cafe</span>
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
            <button
              onClick={handleLogout}
              className="text-sm font-semibold text-red-600 hover:bg-red-50 px-4 py-2 rounded-md transition border border-red-200"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
