import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import swal from "sweetalert";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(form.email, form.password);

      swal({
        title: "Login Successful!",
        text: "Welcome back!",
        icon: "success",
        button: "Go to Dashboard",
      }).then(() => {
        navigate("/dashboard");
      });
    } catch (err) {
      swal({
        title: "Login Failed",
        text: "Invalid email or password.",
        icon: "error",
        button: "Try Again",
      });
    }
  };

  return (
    <section className="font-mono bg-white">
      <div className="container mx-auto">
        <div className="flex justify-center px-6 my-24">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            {/* Image side */}
            <div
              className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover bg-center rounded-l-lg"
              style={{
                backgroundImage:
                  "url('https://imgs.search.brave.com/ti7F41pW3oNrqH6FqBXQEqUEzFDnl1Wf-F8YtVViYTU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9waXhs/ci5jb20vaW1hZ2Vz/L2luZGV4L3Byb2R1/Y3QtaW1hZ2Utb25l/LndlYnA')",
              }}
            ></div>

            {/* Form side */}
            <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none border-8 border-orange-400 border-opacity-40">
              <h3 className="pt-4 text-2xl text-center">Login to your Account!</h3>
              <form
                className="px-8 pt-6 pb-8 mb-4 space-y-3 bg-white rounded"
                onSubmit={handleSubmit}
              >
                <div>
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@domain.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="******************"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                  >
                    Login
                  </button>
                </div>
                <hr className="my-4 border-t" />
                <div className="text-center">
                  <Link
                    to="/forgetpassword"
                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="text-center">
                  <Link
                    to="/register"
                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                  >
                    Didn't have an account? Register!
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
