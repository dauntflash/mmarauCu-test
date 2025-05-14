'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { auth } from "../../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";

type Props = {
  showNav: boolean;
  closeNav: () => void;
};

function MobileNav({ closeNav, showNav }: Props) {
  const navOpen = showNav ? "translate-x-0" : "translate-x-[-100%]";
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [userInitials, setUserInitials] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Initial check for current user on mount
    const currentUser = auth.currentUser;
    if (currentUser && currentUser.emailVerified) {
      const displayName = currentUser.displayName || "";
      const initials = displayName
        ? displayName
            .split(" ")
            .map((name) => name.charAt(0))
            .join("")
            .toUpperCase()
            .slice(0, 2)
        : "U";
      setUserInitials(initials);
    } else {
      setUserInitials(null);
    }

    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        const displayName = user.displayName || "";
        const initials = displayName
          ? displayName
              .split(" ")
              .map((name) => name.charAt(0))
              .join("")
              .toUpperCase()
              .slice(0, 2)
          : "U";
        setUserInitials(initials);
      } else {
        setUserInitials(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    toast(
      <div>
        <p className="mb-4">Are you sure you want to log out?</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={async () => {
              try {
                await signOut(auth);
                toast.success("Logged out successfully!", { autoClose: 1500 });
                closeNav();
                router.push("/");
              } catch (err) {
                console.error("Sign out error:", err);
                toast.error("Failed to log out. Please try again.", { autoClose: 3000 });
              }
            }}
            className="px-4 py-2 bg-[#393ee3] text-white rounded-md hover:bg-[#2c2fbf] transition-all duration-300"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-all duration-300"
          >
            No
          </button>
        </div>
      </div>,
      { autoClose: false, closeOnClick: false, draggable: false }
    );
  };

  return (
    <div>
      {/* Overlay */}
      <div
        className={`fixed ${navOpen} inset-0 transform transition-all duration-500 ease-in-out z-[1020] bg-black bg-opacity-70 backdrop-blur-sm w-full h-screen`}
        onClick={closeNav}
      ></div>
      {/* Nav Links */}
      <div
        className={`${navOpen} text-white fixed justify-center flex flex-col h-full transform transition-all duration-500 ease-in-out w-[80%] sm:w-[60%] space-y-6 bg-[#393ee3] shadow-2xl z-[1030] top-0`}
      >
        <div className="flex flex-col space-y-5 ml-[4rem] font-bold text-2xl">
          <Link 
            href={"/"} 
            onClick={closeNav}
            className="hover:text-blue-200 transition-colors duration-300"
          >
            Home
          </Link>
          {/* About Us Dropdown */}
          <div className="cursor-pointer flex items-center justify-between pr-6">
            <Link 
              href={"/aboutUs"}
              className="hover:text-blue-200 transition-colors duration-300"
            >
              <span onClick={closeNav}>About Us</span>
            </Link>
            <i
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`fa fa-chevron-${isDropdownOpen ? "up" : "down"} ml-2 transition-transform duration-300`}
              style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              aria-hidden="true"
            ></i>
          </div>
          <div
            className={`flex flex-col ml-4 text-lg space-y-2 overflow-hidden transition-all duration-500 ease-in-out font-semibold ${
              isDropdownOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <Link
              href="/aboutUs/ministries"
              onClick={() => {
                closeNav();
                setIsDropdownOpen(false);
              }}
              className="hover:text-blue-200 transition-colors duration-300"
            >
              Ministries
            </Link>
            <Link
              href="/aboutUs/leadership"
              onClick={() => {
                closeNav();
                setIsDropdownOpen(false);
              }}
              className="hover:text-blue-200 transition-colors duration-300"
            >
              Leadership
            </Link>
          </div>
          <Link 
            href={"/give"} 
            onClick={closeNav}
            className="hover:text-blue-200 transition-colors duration-300"
          >
            Give
          </Link>
          <Link 
            href={"/prayer"} 
            onClick={closeNav}
            className="hover:text-blue-200 transition-colors duration-300"
          >
            Prayer
          </Link>
          <Link 
            href={"/media"} 
            onClick={closeNav}
            className="hover:text-blue-200 transition-colors duration-300"
          >
            Media
          </Link>
          <Link 
            href={"/resources"} 
            onClick={closeNav}
            className="hover:text-blue-200 transition-colors duration-300"
          >
            Resources
          </Link>
          <Link 
            href={"/contactUs"} 
            onClick={closeNav}
            className="hover:text-blue-200 transition-colors duration-300"
          >
            Contact Us
          </Link>
          {userInitials ? (
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between pr-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-white text-[#393ee3] w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg shadow-md hover:shadow-lg transition-all duration-300">
                    {userInitials}
                  </div>
                  <span>User Menu</span>
                </div>
                <i
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className={`fa fa-chevron-${isUserMenuOpen ? "up" : "down"} ml-2 transition-transform duration-300`}
                  style={{ transform: isUserMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  aria-hidden="true"
                ></i>
              </div>
              <div
                className={`flex flex-col ml-4 text-lg space-y-2 overflow-hidden transition-all duration-500 ease-in-out font-semibold ${
                  isUserMenuOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <Link
                  href="/profile"
                  onClick={() => {
                    closeNav();
                    setIsUserMenuOpen(false);
                  }}
                  className="hover:text-blue-200 transition-colors duration-300"
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsUserMenuOpen(false);
                  }}
                  className="text-left hover:text-blue-200 transition-colors duration-300"
                >
                  Log Out
                </button>
              </div>
            </div>
          ) : (
            <Link 
              href={"/signIn"} 
              onClick={closeNav}
              className="hover:text-blue-200 transition-colors duration-300"
            >
              Sign In
            </Link>
          )}
        </div>
        {/* Close Icon */}
        <button
          onClick={closeNav}
          className="absolute top-[0.7rem] right-[1.4rem] sm:w-8 sm:h-8 w-6 h-6 text-white hover:text-blue-200 transition-colors duration-300 focus:outline-none"
        >
          <CgClose className="w-full h-full" />
        </button>
      </div>
    </div>
  );
}

export default MobileNav;