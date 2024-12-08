import Link from "next/link";

interface SignupFormProps {
  onBackToLogin: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onBackToLogin }) => {
  return (
    <>
      <div className="text-[20px] text-[#2A3A50] font-semibold mb-5">
        Create an account
      </div>
      <form action="" autoComplete="off">
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
              required
              name="password"
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

        {/* Submit Button */}
        <div className="mt-5">
          <Link
            href=""
            className="w-full cursor-pointer inline-flex justify-center items-center text-center text-[13px] text-white font-semibold h-[50px] px-8 bg-[#ff5200] hover:shadow-md uppercase"
          >
            <input type="submit" className="hidden" />
            SIGN UP
          </Link>
        </div>

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
      </form>
    </>
  );
};

export default SignupForm;
