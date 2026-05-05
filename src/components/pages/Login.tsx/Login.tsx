import type { FormEvent } from "react";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { login } from "../../../services/auth.service";
import { setLocalStorage } from "../../../utils/storage";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const payload = {
      email: form.email.value,
      password: form.password.value,
    };

    const result = await login(payload);
    console.log(result);

    if (!result.error) {
      setLocalStorage("auth", result.token);
      return navigate("/orders");
    }

    alert(`error ${result.error}`);
  };
  return (
    <main>
      <div className="flex flex-col gap-3 w-full h-screen justify-center items-center">
        <div className=" w-100 card shadow-md  rounded-md  p-10">
          <h1 className="text-blue-600 text-3xl  font-bold  text-center">
            Login
          </h1>
          <form onSubmit={handleLogin} className="gap-3">
            <Input
              label="Email"
              name="email"
              type="email"
              id="email"
              placeholder="Masukkan email"
            />
            <Input
              label="Password"
              name="password"
              type="password"
              id="password"
              placeholder="Masukkan password"
            />

            <div className="mt-2">
              <Button type="submit">Login</Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
