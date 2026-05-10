import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../services/auth.service";

const Header = () => {
  const navigate = useNavigate();
  const currentRoute = useLocation().pathname;
  const menus = [
    {
      path: "/orders",
      name: "Orders",
      active: currentRoute === "/orders",
    },
    {
      path: "/create-order",
      name: "Create Order",
      active: currentRoute === "/create-order",
    },
  ];
  console.log("currentRoute", currentRoute);

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
                    className={`text-sm font-medium ${val.active ? "text-emerald-600" : "text-gray-700"}  hover:text-emerald-900 transition`}
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
