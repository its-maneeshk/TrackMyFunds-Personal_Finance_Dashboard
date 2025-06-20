import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import swal from "sweetalert";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register(form.name, form.email, form.password);

      swal({
        title: "Registration Successful!",
        text: "You can now log in to your account.",
        icon: "success",
        button: "Go to Login",
      }).then(() => {
        navigate("/login");
      });
    } catch (err) {
      swal({
        title: "Registration Failed",
        text: "Email already registered.",
        icon: "error",
        button: "OK",
      });
    }
  };

  return (
    <section className="font-mono bg-white">
      <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            <div
              className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover bg-center rounded-l-lg"
              style={{
                backgroundImage:
                  "url('https://cdn3.pixelcut.app/7/20/uncrop_hero_bdf08a8ca6.jpg')",
              }}
            ></div>

            <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none border-8 border-pink-400 border-opacity-40">
              <h3 className="pt-4 text-2xl text-center">Create an Account!</h3>
              <form
                className="px-8 pt-6 pb-8 mb-4 space-y-3 bg-white rounded"
                onSubmit={handleSubmit}
              >
                <div>
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="name"
                  >
                    Full Name
                  </label>
                  <input
                    name="name"
                    id="name"
                    type="text"
                    placeholder="eg: Manish Patel"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    name="email"
                    id="email"
                    type="email"
                    placeholder="yourmail@domain.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
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
                    name="password"
                    id="password"
                    type="password"
                    placeholder="******************"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                  >
                    Register Account
                  </button>
                </div>
                <hr className="my-4 border-t" />
                <div className="flex items-center justify-center space-x-3">
                  <div className="text-center">
                    <Link
                      to="/forgetpassword"
                      className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    >
                      Forgotten Password? <br /> Reset here!
                    </Link>
                  </div>
                  <div className="h-16 w-0.5 bg-gray-300"></div>
                  <div className="text-center">
                    <Link
                      to="/login"
                      className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    >
                      Already have an account? <br /> Login!
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
