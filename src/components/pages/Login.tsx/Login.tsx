import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { login } from "../../../services/auth.service";
import { setLocalStorage } from "../../../utils/storage";
import { useNavigate } from "react-router-dom";
import { useState, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: async (event: FormEvent) => {
      event.preventDefault();
      const form = event.target as HTMLFormElement;
      const payload = {
        email: form.email.value,
        password: form.password.value,
      };

      const result = await login(payload);

      return result;
    },

    onSuccess: (result) => {
      if (!result.token) {
        alert("Login failed, please check your credentials");
        return;
      }
      setLocalStorage("auth", result.token);
      return navigate("/orders");
    },
    onError: (error) => {
      alert(`error ${error}`);
    },
  });

  return (
    <main>
      <div className="flex flex-col gap-3 w-full h-screen justify-center items-center">
        <div className=" w-100 card shadow-md  rounded-md  p-10">
          <h1 className="text-emerald-600 text-3xl  font-bold  text-center">
            Login
          </h1>
          <form onSubmit={mutate} className="gap-3">
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
              showPassword={showPassword}
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            />

            <div className="mt-2">
              <Button isloading={isPending} type="submit">
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
