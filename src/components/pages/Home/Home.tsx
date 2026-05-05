import { Link } from "react-router-dom";
import Button from "../../ui/Button";

const Home = () => {
  return (
    <main>
      <div className="flex flex-col h-screen justify-center items-center gap-8">
        <h1 className="text-3xl text-blue-500 font-bold">
          Welcome To Rofik Cafe
        </h1>

        <Link to={"/login"}>
          <Button type="submit">Login</Button>
        </Link>
      </div>
    </main>
  );
};

export default Home;
