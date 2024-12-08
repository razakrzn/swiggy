import { useState, useEffect } from "react";
import Login from "./Login";
import Signup from "./Signup";

const AuthModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) => {
  const [isSignup, setIsSignup] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsSignup(false); // Reset to Login on modal visibility
    }
  }, [isVisible]);

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {isVisible && (
        <div
          className="z-[10000] fixed inset-0 bg-[#282c3f] opacity-70 overflow-hidden
        "
          onClick={handleOverlayClick}
        ></div>
      )}
      <div
        className={`left-auto right-0 transform fixed top-0 h-full overflow-y-scroll bg-white transition-transform ease-out duration-300 z-[10001] ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="relative">
          {!isSignup ? (
            // Pass a dynamic `key` to force remounting on modal open
            <Login
              key={isVisible.toString()} // Ensures `Login` remounts when modal toggles
              onSignupClick={() => setIsSignup(true)}
              onClose={onClose}
            />
          ) : (
            <Signup onClose={onClose} onLoginClick={() => setIsSignup(false)} />
          )}
        </div>
      </div>
    </>
  );
};

export default AuthModal;
