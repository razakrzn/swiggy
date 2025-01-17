import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";
import { useOwnerAuth } from "@/contexts/OwnerAuthContext";

interface SignupFormProps {
  onBackToLogin: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onBackToLogin }) => {
  const [showPopup, setShowPopup] = useState(false);
  const { login } = useOwnerAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "restaurant_owner",
  });

  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    console.log("Submitting form data:", formData);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/v1/auth/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Registration failed");
        return;
      }

      const { access, refresh } = data;

      if (access && refresh) {
        Cookies.set("owner_authToken", access);
        Cookies.set("owner_refresh_token", refresh);

        setShowPopup(true);

        await login(access, refresh);

        setFormData({
          username: "",
          email: "",
          password: "",
          role: "restaurant_owner",
        });
      } else {
        setError("Tokens not received. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again later.");
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    router.push("/dashboard/addingdetails");
  };

  return (
    <>
      <div className="text-[20px] text-[#2A3A50] font-semibold mb-5">
        Create an account
      </div>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div>
          <div className="border border-b-0 border-[#d4d5d9] p-0 block relative transform-gpu">
            <input
              type="text"
              required
              name="username"
              id="username"
              tabIndex={1}
              autoComplete="off"
              className="bg-transparent border-0 outline-0 h-[70px] w-full text-[17px] px-5 pt-[22px] box-border font-medium peer"
              value={formData.username}
              onChange={handleChange}
            />
            <label
              htmlFor="username"
              className="text-[14px] font-medium text-[#93959f] absolute left-0 bottom-[24px] pl-[20px] w-full transform transition-all duration-300 peer-valid:-translate-y-[100%] peer-valid:text-[#7e808c] peer-valid:text-[11.5px] peer-focus:-translate-y-[100%] peer-focus:text-[#7e808c] peer-focus:text-[11.5px] cursor-text pointer-events-none"
            >
              Username
            </label>
          </div>

          {/* Email */}
          <div className="border border-b-0 border-[#d4d5d9] p-0 block relative transform-gpu">
            <input
              type="email"
              required
              name="email"
              onChange={handleChange}
              id="email"
              tabIndex={2}
              autoComplete="off"
              className="bg-transparent border-0 outline-0 h-[70px] w-full text-[17px] px-5 pt-[22px] box-border font-medium peer"
            />
            <label
              htmlFor="email"
              className="text-[14px] font-medium text-[#93959f] absolute left-0 bottom-[24px] pl-[20px] w-full transform transition-all duration-300 peer-valid:-translate-y-[100%] peer-valid:text-[#7e808c] peer-valid:text-[11.5px] peer-focus:-translate-y-[100%] peer-focus:text-[#7e808c] peer-focus:text-[11.5px] cursor-text pointer-events-none"
            >
              Email
            </label>
          </div>

          {/* Password */}
          <div className="border border-[#d4d5d9] p-0 block relative transform-gpu">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              id="password"
              tabIndex={3}
              autoComplete="off"
              className="bg-transparent border-0 outline-0 h-[70px] w-full text-[17px] px-5 pt-[22px] box-border font-medium peer"
            />
            <label
              htmlFor="password"
              className="text-[14px] font-medium text-[#93959f] absolute left-0 bottom-[24px] pl-[20px] w-full transform transition-all duration-300 peer-valid:-translate-y-[100%] peer-valid:text-[#7e808c] peer-valid:text-[11.5px] peer-focus:-translate-y-[100%] peer-focus:text-[#7e808c] peer-focus:text-[11.5px] cursor-text pointer-events-none"
            >
              Password
            </label>
          </div>
        </div>
        <div className="mt-5">
          <button
            type="submit"
            className="w-full cursor-pointer inline-flex justify-center items-center text-center text-[13px] text-white font-semibold h-[50px] px-8 bg-[#ff5200] hover:shadow-md uppercase"
          >
            SIGN UP
          </button>
        </div>
      </form>

      {/* Back to Login */}
      <div className="my-4 flex justify-center">
        <button
          type="button"
          onClick={onBackToLogin}
          className="text-[13px] text-logoColor font-semibold"
        >
          Back to Login
        </button>
      </div>

      {/* Terms & Conditions */}
      <div className="text-[11px] text-[#686b78] font-medium">
        By clicking on Sign Up, I accept the{" "}
        <Link href="/" className="text-[#282c3f]">
          Terms & Conditions
        </Link>{" "}
        &
        <Link href="/" className="text-[#282c3f]">
          Privacy Policy
        </Link>
      </div>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="w-16 h-16 inline-block">
              <img src="/images/popup.svg" alt="tik" />
            </span>
            <h2 className="font-medium my-4">Registration Successful!</h2>
            <button onClick={closePopup} className="popup-button">
              Done
            </button>
          </div>
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </>
  );
};

export default SignupForm;