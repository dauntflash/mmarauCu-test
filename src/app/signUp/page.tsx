'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase/config";
import { updateProfile, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [createUserWithEmailAndPassword, , loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const router = useRouter();

  const [isFocused, setIsFocused] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

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

  const clearForm = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setIsFocused({
      username: false,
      email: false,
      password: false,
      confirmPassword: false,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim()) {
      toast.error("Full name is required");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const toastId = toast.loading("Creating your account...");

    try {
      const userCredential = await createUserWithEmailAndPassword(email, password);

      if (!userCredential) {
        throw new Error("User creation failed");
      }

      try {
        await updateProfile(userCredential.user, {
          displayName: username,
        });
      } catch (profileErr) {
        console.error("Error updating profile:", profileErr);
      }

      try {
        await sendEmailVerification(userCredential.user);
      } catch (emailErr) {
        console.error("Error sending email verification:", emailErr);
        toast.warn("Account created, but failed to send verification email. Please verify your email later.", {
          autoClose: 5000,
        });
      }

      try {
        await setDoc(doc(db, "users", userCredential.user.uid), {
          username: username,
          email: email,
          createdAt: new Date().toISOString(),
        });
      } catch (firestoreErr) {
        console.error("Error storing user data in Firestore:", firestoreErr);
      }

      clearForm();
      toast.update(toastId, {
        render: "Account created! Please check your email to verify your account.",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      router.push("/firebase/emailConfirmation");

    } catch (err: unknown) {
      console.error("Sign-up error:", err);

      const errorMessages: { [key: string]: string } = {
        'auth/email-already-in-use': "This email is already registered. Please use a different email or sign in.",
        'auth/invalid-email': "The email address is not valid.",
        'auth/weak-password': "The password is too weak. Please use a stronger password.",
        'auth/operation-not-allowed': "Sign-up is currently disabled. Please try again later.",
        'auth/network-request-failed': "Network error. Please check your connection and try again.",
      };

      const errorMessage = errorMessages[(err as { code: string }).code] || "Failed to create account. Please try again.";

      toast.update(toastId, {
        render: errorMessage,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    if (error) {
      const errorMessages: { [key: string]: string } = {
        'auth/email-already-in-use': "This email is already registered. Please use a different email or sign in.",
        'auth/invalid-email': "The email address is not valid.",
        'auth/weak-password': "The password is too weak. Please use a stronger password.",
        'auth/operation-not-allowed': "Sign-up is currently disabled. Please try again later.",
        'auth/network-request-failed': "Network error. Please check your connection and try again.",
      };

      const errorMessage = errorMessages[error.code] || "Failed to create account. Please try again.";
      toast.error(errorMessage, { autoClose: 3000 });
    }
  }, [error]);

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
            Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Family</span>
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
          Create Account
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div variants={fadeInUp} className="relative">
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => handleFocus("username")}
              onBlur={() => handleBlur("username", username)}
              className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg text-lg outline-none focus:border-blue-600 peer bg-white transition-colors"
              required
            />
            <label
              className={`absolute left-4 px-1 bg-white font-medium transition-all duration-200 pointer-events-none ${
                isFocused.username || username
                  ? "top-[-10px] text-sm text-blue-600"
                  : "top-3 text-md text-gray-400"
              }`}>
              Full Name
            </label>
          </motion.div>

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
              }`}>
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
              }`}>
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

          <motion.div variants={fadeInUp} className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onFocus={() => handleFocus("confirmPassword")}
              onBlur={() => handleBlur("confirmPassword", confirmPassword)}
              className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg text-lg outline-none focus:border-blue-600 peer bg-white transition-colors"
              required
            />
            <label
              className={`absolute left-4 px-1 bg-white font-medium transition-all duration-200 pointer-events-none ${
                isFocused.confirmPassword || confirmPassword
                  ? "top-[-10px] text-sm text-blue-600"
                  : "top-3 text-md text-gray-400"
              }`}>
              Confirm Password
            </label>
            <motion.button
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-4 top-3 text-gray-500 hover:text-gray-700 transition-colors"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
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
                  <span>Creating account...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </motion.button>
          </motion.div>
        </form>

        <motion.div 
          variants={fadeInUp}
          className="w-full text-center mt-8"
        >
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link href="/signIn">
              <span className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                Sign In
              </span>
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default SignUp;