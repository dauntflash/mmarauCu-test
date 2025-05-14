"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { auth } from "../../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";

type Props = {
  openNav: () => void;
};

const NavBar = ({ openNav }: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [navBg, setNavBg] = useState(false);
  const [forms, setForms] = useState(false);
  const [is404, setIs404] = useState(false);
  const [userInitials, setUserInitials] = useState<string | null>(null);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
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

  useEffect(() => {
    if (
      pathname === "/signIn" ||
      pathname === "/signUp" ||
      pathname === "/prayer/addPrayer" ||
      pathname === "/firebase/emailConfirmation" ||
      pathname === "/profile"
    ) {
      setForms(true);
    } else {
      setForms(false);
    }

    fetch(pathname, { method: "HEAD" }).then((res) => {
      if (res.status === 404) {
        setIs404(true);
      }
    });
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
      setNavBg(scrollPosition > 90);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
                router.push("/");
              } catch (err) {
                console.error("Sign out error:", err);
                toast.error("Failed to log out. Please try again.", { autoClose: 3000 });
              }
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all">
            Yes
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-all">
            No
          </button>
        </div>
      </div>,
      { autoClose: false, closeOnClick: false, draggable: false }
    );
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/aboutUs", label: "About Us", dropdown: true },
    { href: "/give", label: "Give" },
    { href: "/prayer", label: "Prayer" },
    { href: "/media", label: "Media" },
    { href: "/resources", label: "Resources" },
    { href: "/contactUs", label: "Contact Us" },
  ];

  return (
    <>
      {!is404 && (
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className={`fixed w-full transition-all duration-300 h-[10vh] z-50 flex items-center top-0
            ${
              forms 
                ? "bg-blue-600 shadow-lg" 
                : navBg 
                  ? "bg-blue-600 shadow-lg backdrop-blur-sm bg-opacity-90" 
                  : "bg-transparent pt-[4rem]"
            }
          `}>
          <div className="w-[90%] sm:w-[80%] mx-auto flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="transform hover:scale-105 transition-transform duration-300">
              <Image
                src={"/bg/images/cu_logo.png"}
                alt="MMU CU Logo"
                width={60}
                height={60}
                className="object-cover"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6 text-white ml-[30%] text-sm font-semibold">
              {navLinks.map((link) => (
                <div key={link.href} className="relative group">
                  {link.dropdown ? (
                    <div
                      onMouseEnter={() => setIsDropdownOpen(true)}
                      onMouseLeave={() => setIsDropdownOpen(false)}
                      className="relative"
                    >
                      <Link
                        href={link.href}
                        className={`flex items-center px-5 py-2 rounded-lg transition-all duration-300 ${
                          pathname.startsWith(link.href)
                            ? "bg-white text-blue-600 shadow-md"
                            : "hover:bg-blue-700"
                        }`}
                      >
                        <span>{link.label}</span>
                        <svg
                          className={`w-4 h-4 ml-2 transition-transform duration-300 ${
                            isDropdownOpen ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </Link>
                      <AnimatePresence>
                        {isDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-xl overflow-hidden"
                          >
                            <div className="py-1">
                              <Link
                                href="/aboutUs/ministries"
                                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                              >
                                Ministries
                              </Link>
                              <Link
                                href="/aboutUs/leadership"
                                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                              >
                                Leadership
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className={`px-5 py-2 rounded-lg transition-all duration-300 ${
                        pathname === link.href
                          ? "bg-white text-blue-600 shadow-md"
                          : "hover:bg-blue-700"
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              {userInitials ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="bg-white text-blue-600 w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    {userInitials}
                  </button>
                  <AnimatePresence>
                    {isUserDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl overflow-hidden"
                      >
                        <div className="py-1">
                          <Link
                            href="/profile"
                            className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          >
                            Profile
                          </Link>
                          <button
                            onClick={handleSignOut}
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          >
                            Log Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  href="/signIn"
                  className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </motion.nav>
      )}
    </>
  );
};

export default NavBar;
