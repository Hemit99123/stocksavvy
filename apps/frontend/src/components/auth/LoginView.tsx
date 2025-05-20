"use client";

import { useState } from "react";
import httpHeader from "../../services/httpHeader";
import { toast } from "react-toastify";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [name, setName] = useState("");
  const [isOTPGenerated, setIsOTPGenerated] = useState(false); // Track if OTP is generated

  const handleGenerateOTP = async () => {
    try {
      await httpHeader.post("/auth/assign-otp", { email });
      setIsOTPGenerated(true); // Mark OTP as generated
      toast.info("OTP has been sent to your email!");
    } catch (error) {
      toast.info("Failed to generate OTP. Please check your email and try again.");
      console.error(error);
    }
  };

  const handleVerifyOTPLogin = async () => {
    try {
      await httpHeader.post("/auth/login", {
        email,
        otp,
        name,
      });
      toast.info("OTP verification successful!");
    } catch (error) {
      toast.info("OTP verification failed. Please try again.");
      console.error(error);
    }
  };

  return (
    // Outer container that centers the content and adds the width/height to it 
    <div className="h-screen w-screen lg:w-1/2 flex flex-col justify-center items-center mx-auto">
        <div className="block lg:hidden">
          <h1 className="text-4xl font-bold mb-11">Welcome Back!</h1>
        </div>
        <div className="w-full mt-10">
          <hr className="my-6 border-gray-300" />

          {/* Email Login Section */}
          {!isOTPGenerated && (
            <>
              <h2 className="text-xl font-semibold mb-4 text-center">Login with Email</h2>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-100 placeholder-gray-500 rounded-lg mb-4 focus:outline-none"
                />
                <button
                  onClick={handleGenerateOTP}
                  className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Generate OTP
                </button>
              </div>
            </>
          )}

          {/* OTP Verification Section */}
          {isOTPGenerated && (
            <div>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
                className="w-full px-4 py-2 bg-gray-100 placeholder-gray-500 rounded-lg focus:outline-none mb-4"
              />
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 bg-gray-100 placeholder-gray-500 rounded-lg focus:outline-none mb-4"
              />
              <button
                onClick={handleVerifyOTPLogin}
                className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Login
              </button>
            </div>
          )}
        </div>

      </div>
  );
};

export default Auth;
