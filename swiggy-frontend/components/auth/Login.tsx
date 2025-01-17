import Link from "next/link";
import { useEffect, useRef, useState, useContext } from "react";
import { useCustomerAuth } from "@/contexts/CustomerAuthContext";

interface LoginProps {
  onSignupClick: () => void;
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ onSignupClick, onClose }) => {
  const { login } = useCustomerAuth();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [localError, setLocalError] = useState<string | null>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    phoneInputRef.current?.focus();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setLocalError(data.error || "Login failed");
        return;
      }

      if (data.role === "customer") {
        await login(data.access, data.refresh);
        setShowPopup(true);
        setFormData({ username: "", password: "" });
      } else {
        setLocalError("invalid credentials");
        return;
      }
    } catch (err) {
      console.error(err);
      setLocalError("Something went wrong. Please try again later.");
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    window.location.reload();
  };

  return (
    <>
      <div className="relative">
        <div>
          <div className="pl-10 pr-[120px] w-[522px]">
            <div className="relative pt-7 mb-[69px] z-1 h-[130px]">
              <button
                onClick={onClose}
                className="cursor-pointer w-[15px] inline-block"
              >
                <img
                  src="/images/close.svg"
                  alt="close icon"
                  className="w-full block"
                />
              </button>
              <div className="mt-6 text-[28px] font-medium">Login</div>
              <div className="mt-[10] font-normal text-sm relative after:content-[''] after:absolute after:bottom-[-22px] after:left-0 after:w-[30px] after:border after:border-black">
                or{" "}
                <button
                  onClick={onSignupClick}
                  className="font-medium text-logoColor"
                >
                  create an account
                </button>
              </div>
              <img
                src="/images/image-login.png"
                alt="login bg"
                className="absolute w-[100px] right-0 top-[58px]"
              />
            </div>
            <form onSubmit={handleSubmit}>
              <div>
                <div className="border border-[#d4d5d9] p-0 block relative transform-gpu">
                  <input
                    type="text"
                    required
                    name="username"
                    id="username"
                    tabIndex={1}
                    autoComplete="off"
                    ref={phoneInputRef}
                    value={formData.username}
                    onChange={handleChange}
                    className="bg-transparent border-0 outline-0 h-[60px] w-full text-[17px] px-5 pt-[22px] box-border font-medium peer"
                  />
                  <label
                    htmlFor="email"
                    className="text-[14px] font-medium text-[#93959f] absolute left-0 bottom-[24px] pl-[20px] w-full transform transition-all duration-300 peer-valid:-translate-y-[100%] peer-valid:text-[#7e808c] peer-valid:text-[11.5px] peer-focus:-translate-y-[100%] peer-focus:text-[#7e808c] peer-focus:text-[11.5px] cursor-text pointer-events-none"
                  >
                    Username
                  </label>
                </div>
              </div>
              <div className="mt-5">
                <div className="border border-[#d4d5d9] p-0 block relative transform-gpu">
                  <input
                    type="password"
                    required
                    name="password"
                    id="password"
                    tabIndex={2}
                    autoComplete="off"
                    className="bg-transparent border-0 outline-0 h-[60px] w-full text-[17px] px-5 pt-[22px] box-border font-medium peer"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="password"
                    className="text-[14px] font-medium text-[#93959f] absolute left-0 bottom-[24px] pl-[20px] w-full transform transition-all duration-300 peer-valid:-translate-y-[100%] peer-valid:text-[#7e808c] peer-valid:text-[11.5px] peer-focus:-translate-y-[100%] peer-focus:text-[#7e808c] peer-focus:text-[11.5px] cursor-text pointer-events-none"
                  >
                    Password
                  </label>
                </div>
              </div>
              <p className="text-xs text-logoColor text-center mt-2">
                {localError}
              </p>
              <div className="mt-5">
                <button
                  type="submit"
                  className="w-full cursor-pointer inline-flex justify-center items-center text-center text-[13px] text-white font-semibold h-[50px] px-8 bg-[#ff5200] hover:shadow-md uppercase"
                >
                  Login
                </button>
              </div>
              <div className="text-[11px] text-[#686b78] mt-5 font-medium">
                By clicking on Login, I accept the{" "}
                <Link href="" className="text-[#282c3f]">
                  Terms & Conditions
                </Link>
                &
                <Link href="" className="text-[#282c3f]">
                  Privacy Policy
                </Link>
              </div>
            </form>
            {showPopup && (
              <div className="popup">
                <div className="popup-content">
                  <span className="w-16 h-16 inline-block">
                    <img src="/images/popup.svg" alt="tik" />
                  </span>
                  <h2 className="font-medium my-4">LogIn Successful!</h2>
                  <button
                    onClick={closePopup}
                    tabIndex={0}
                    className="popup-button"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
