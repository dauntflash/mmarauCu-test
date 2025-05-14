'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { sendEmailVerification } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false,
  });

  const [signInWithEmailAndPassword, , loading] =
    useSignInWithEmailAndPassword(auth);

  const router = useRouter();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const handleFocus = (field: string) => setIsFocused({ ...isFocused, [field]: true });
  const handleBlur = (field: string, value: string) => {
    setIsFocused({ ...isFocused, [field]: !!value });
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleResendVerification = async () => {
    if (!email || !validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    const toastId = toast.loading("Sending verification email...");
    try {
      const userCredential = await signInWithEmailAndPassword(email, password);
      if (userCredential && userCredential.user) {
        if (!userCredential.user.emailVerified) {
          await sendEmailVerification(userCredential.user);
          toast.dismiss(toastId);
          toast.success("Verification email sent! Please check your inbox.", {
            autoClose: 3000,
          });
        } else {
          toast.dismiss(toastId);
          toast.success("Your email is already verified. Signing in...", {
            autoClose: 1500,
          });
          setTimeout(() => router.push("/"), 1500);
        }
      }
    } catch (err: unknown) {
      console.error("Resend verification error:", err);
      toast.dismiss(toastId);
      toast.error("Failed to send verification email. Please try again.", {
        autoClose: 3000,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!password) {
      toast.error("Password is required");
      return;
    }

    const toastId = toast.loading("Signing in...");

    try {
      const userCredential = await signInWithEmailAndPassword(email, password);
      if (!userCredential) {
        throw new Error("Failed to sign in");
      }

      if (!userCredential.user.emailVerified) {
        toast.dismiss(toastId);
        toast.error(
          <div>
            Your email is not verified. Please verify your email to sign in.
            <button
              onClick={handleResendVerification}
              className="underline text-blue-600 ml-2"
            >
              Resend verification email
            </button>
          </div>,
          { autoClose: 5000 }
        );
        return;
      }

      toast.dismiss(toastId);
      toast.success("Signed in successfully!", {
        autoClose: 1500,
      });

      setTimeout(() => router.push("/"), 1500);

    } catch (err: unknown) {
      console.error("Sign-in error:", err);
      const errorMessages: { [key: string]: string } = {
        'auth/user-not-found': "No account found with this email.",
        'auth/wrong-password': "Incorrect password. Please try again.",
        'auth/invalid-email': "The email address is not valid.",
        'auth/too-many-requests': "Too many attempts. Please try again later.",
        'auth/network-request-failed': "Network error. Please check your connection.",
      };

      const errorMessage = errorMessages[(err instanceof Error && 'code' in err ? (err as { code?: string }).code : "") || ""] || "Failed to sign in. Please try again.";

      toast.dismiss(toastId);
      toast.error(errorMessage, {
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <div className="relative w-full h-[40vh] overflow-hidden">
        <Image
          src="/bg/images/prayer.jpg"
          alt="Prayer"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 backdrop-blur-[2px]"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center"
        >
          <h1 className="text-white text-4xl md:text-6xl font-bold">
            Welcome <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Back</span>
          </h1>
        </motion.div>
      </div>

      <motion.div 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg mt-8 mb-8"
      >
        <motion.h2 
          variants={fadeInUp}
          className="text-3xl font-bold text-center mb-8 text-blue-700"
        >
          Sign In
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div variants={fadeInUp} className="relative">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => handleFocus("email")}
              onBlur={() => handleBlur("email", email)}
              className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg text-lg outline-none focus:border-blue-600 peer bg-white transition-colors"
              required
            />
            <label
              className={`absolute left-4 px-1 bg-white font-medium transition-all duration-200 pointer-events-none ${
                isFocused.email || email
                  ? "top-[-10px] text-sm text-blue-600"
                  : "top-3 text-md text-gray-400"
              }`}
            >
              Email
            </label>
          </motion.div>

          <motion.div variants={fadeInUp} className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => handleFocus("password")}
              onBlur={() => handleBlur("password", password)}
              className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg text-lg outline-none focus:border-blue-600 peer bg-white transition-colors"
              required
            />
            <label
              className={`absolute left-4 px-1 bg-white font-medium transition-all duration-200 pointer-events-none ${
                isFocused.password || password
                  ? "top-[-10px] text-sm text-blue-600"
                  : "top-3 text-md text-gray-400"
              }`}
            >
              Password
            </label>
            <motion.button
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-4 top-3 text-gray-500 hover:text-gray-700 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <i className="fa-solid fa-eye"></i>
              ) : (
                <i className="fa-solid fa-eye-slash"></i>
              )}
            </motion.button>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            className="flex justify-center pt-4"
          >
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </motion.button>
          </motion.div>
        </form>

        <motion.div 
          variants={fadeInUp}
          className="w-full text-center mt-8"
        >
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link href="/signUp">
              <span className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                Sign Up
              </span>
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default SignIn;