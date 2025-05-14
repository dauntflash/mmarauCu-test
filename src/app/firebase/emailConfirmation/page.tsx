'use client'
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { auth } from "../config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Link from "next/link";

function EmailConfirmation() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Refresh user data to get latest email verification status
        user.reload().then(() => {
          if (user.emailVerified) {
            // Sign out the user to ensure they sign in after verification
            signOut(auth).then(() => {
              router.push("/signIn");
            });
          } else {
            setIsChecking(false);
          }
        });
      } else {
        // No user is signed in, redirect to sign-in
        router.push("/signIn");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSignInRedirect = () => {
    router.push("/signIn");
  };

  return (
    <div className="flex justify-center flex-col bg-blue-100 min-h-screen">
      <div className="bg-[#393ee3] h-[30%] w-full">
        <div className="text-white mt-[10rem] text-center font-light lg:text-6xl md:text-5xl sm:text-5xl border-l-4 w-max mx-auto p-2 py-5 mb-6 px-8 italic border-white">
          Verify Your Email
        </div>
      </div>

      <div className="lg:w-[40%] max-w-[80%] mx-auto bg-gray-50 bg-opacity-70 rounded-lg overflow-hidden shadow-md mb-4 pb-4 mt-[4rem] text-center">
        <h2 className="text-2xl font-bold text-center bg-[#393ee3] py-4 mb-4 text-white">
          Email Verification
        </h2>
        {isChecking ? (
          <p className="text-lg text-gray-700 mt-6">Checking verification status...</p>
        ) : (
          <>
            <p className="text-lg text-gray-700 mt-6">
              We&apos;ve sent a verification email to your inbox. Please click the link in the email to verify your account.
            </p>
            <p className="text-md text-gray-500 mt-4">
              Verified your email? Click below to sign in.
            </p>
            <button
              onClick={handleSignInRedirect}
              className="bg-blue-600 text-white p-2 rounded-md w-[5rem] hover:bg-blue-700 transition-colors mt-6"
            >
              Sign In
            </button>
            <div className="w-full text-center mt-[3rem]">
              <p>
                Already have an account?{" "}
                <span className="text-blue-700 hover:text-blue-900 transition-colors">
                  <Link href="/signIn">Sign In</Link>
                </span>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default EmailConfirmation;