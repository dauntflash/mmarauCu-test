'use client'
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { updateProfile, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/config";
import { toast } from "react-toastify";
import Image from "next/image";

const Profile = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [initials, setInitials] = useState("");
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [yearOfBirth, setYearOfBirth] = useState("");
  const [ministry, setMinistry] = useState("");
  const [course, setCourse] = useState("");
  const [homeCounty, setHomeCounty] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      console.log("Auth state changed:", user ? "User logged in" : "User logged out");
      if (user && user.emailVerified) {
        setIsLoggedIn(true);
        setDisplayName(user.displayName || "Anonymous");
        setEmail(user.email || "");
        setProfilePic(user.photoURL || null);
        setInitials(
          user.displayName
            ? user.displayName
                .split(" ")
                .map((n) => n.charAt(0))
                .join("")
                .toUpperCase()
                .slice(0, 2)
            : "U"
        );

        // Fetch user data from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setPhoneNumber(data.phoneNumber || "");
          setYearOfBirth(data.yearOfBirth || "");
          setMinistry(data.ministry || "");
          setCourse(data.course || "");
          setHomeCounty(data.homeCounty || "");
        }
      } else {
        setIsLoggedIn(false);
        console.log("Redirecting to /signIn due to unauthenticated state");
        router.push("/signIn");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleSignOut = () => {
    console.log("Logout button clicked");
    const toastId = toast(
      <div>
        <p className="mb-4">Are you sure you want to log out?</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={async () => {
              console.log("Yes button clicked, signing out...");
              try {
                await auth.signOut();
                console.log("Sign out successful");
                toast.dismiss(toastId);
                toast.success("Logged out successfully!", { autoClose: 1500 });
                // Let useEffect handle the redirect to /signIn
              } catch (err) {
                console.error("Sign out error:", err);
                toast.dismiss(toastId);
                toast.error("Failed to log out. Please try again.", { autoClose: 3000 });
              }
            }}
            className="px-4 py-2 bg-[#393ee3] text-white rounded-md hover:bg-[#2c2fbf]"
          >
            Yes
          </button>
          <button
            onClick={() => {
              console.log("No button clicked, dismissing toast");
              toast.dismiss(toastId);
            }}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            No
          </button>
        </div>
      </div>,
      { autoClose: false, closeOnClick: false, draggable: false }
    );
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) {
      toast.error("You must be logged in to update your profile.");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Updating profile...");

    try {
      // Update Firebase auth profile
      await updateProfile(auth.currentUser, { displayName });

      // Update Firestore
      await setDoc(
        doc(db, "users", auth.currentUser.uid),
        { phoneNumber },
        { merge: true }
      );

      toast.dismiss(toastId);
      toast.success("Profile updated successfully!", { autoClose: 1500 });
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.dismiss(toastId);
      toast.error("Failed to update profile. Please try again.", { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser || !auth.currentUser.email) {
      toast.error("You must be logged in to update your password.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Updating password...");

    try {
      // Reauthenticate user
      const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPassword);
      await reauthenticateWithCredential(auth.currentUser, credential);

      // Update password
      await updatePassword(auth.currentUser, newPassword);

      toast.dismiss(toastId);
      toast.success("Password updated successfully!", { autoClose: 1500 });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err) {
      console.error("Error updating password:", err);
      toast.dismiss(toastId);
      toast.error("Failed to update password. Please try again.", { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  const handleProfilePicUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser || !selectedFile) {
      toast.error("Please select a file to upload.");
      return;
    }

    // Validate file
    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(selectedFile.type)) {
      toast.error("Only JPEG and PNG files are allowed.");
      return;
    }

    if (selectedFile.size > 1 * 1024 * 1024) {
      toast.error("File size must be less than 1MB.");
      return;
    }

    const img = new window.Image();
    img.src = URL.createObjectURL(selectedFile);
    img.onload = async () => {
      if (img.width < 250 || img.height < 250) {
        toast.error("Image dimensions must be at least 250x250px.");
        return;
      }

      setLoading(true);
      const toastId = toast.loading("Uploading profile picture...");

      try {
        // Upload to Firebase Storage
        if (!auth.currentUser) {
          toast.error("User is not authenticated.");
          return;
        }
        const storageRef = ref(storage, `profile_pics/${auth.currentUser.uid}`);
        await uploadBytes(storageRef, selectedFile);
        const photoURL = await getDownloadURL(storageRef);

        // Update Firebase Auth profile
        await updateProfile(auth.currentUser, { photoURL });
        setProfilePic(photoURL);

        toast.dismiss(toastId);
        toast.success("Profile picture uploaded successfully!", { autoClose: 1500 });
        setSelectedFile(null);
      } catch (err) {
        console.error("Error uploading profile picture:", err);
        toast.dismiss(toastId);
        toast.error("Failed to upload profile picture. Please try again.", { autoClose: 3000 });
      } finally {
        setLoading(false);
      }
    };
  };

  const handlePersonalInfoUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) {
      toast.error("You must be logged in to update your personal info.");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Updating personal info...");

    try {
      await setDoc(
        doc(db, "users", auth.currentUser.uid),
        { yearOfBirth, ministry, course, homeCounty },
        { merge: true }
      );

      toast.dismiss(toastId);
      toast.success("Personal info updated successfully!", { autoClose: 1500 });
    } catch (err) {
      console.error("Error updating personal info:", err);
      toast.dismiss(toastId);
      toast.error("Failed to update personal info. Please try again.", { autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return null; // Redirect handled in useEffect
  }

  return (
    <div className="min-h-screen bg-blue-100 py-10">
      <div className="lg:w-[80%] max-w-[90%] mx-auto flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-[25%] w-full bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col items-center mb-6">
            {profilePic ? (
              <Image
                src={profilePic}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover mb-2"
                width={80}
                height={80}
              />
            ) : (
              <div className="bg-[#393ee3] text-white w-20 h-20 flex items-center justify-center rounded-full font-bold text-2xl mb-2">
                {initials}
              </div>
            )}
            <h3 className="text-lg font-bold text-gray-800">{displayName}</h3>
            <p className="text-sm text-gray-500">{email}</p>
          </div>
          <div className="mb-4">
            <h4 className="text-lg font-semibold text-[#393ee3] border-b-2 border-[#393ee3] pb-1">
              Account Navigation
            </h4>
          </div>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveSection("profile")}
                className={`w-full text-left py-2 px-4 rounded-md ${
                  activeSection === "profile"
                    ? "bg-[#393ee3] text-white"
                    : "text-gray-700 hover:bg-blue-100"
                }`}
              >
                Profile Settings
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("password")}
                className={`w-full text-left py-2 px-4 rounded-md ${
                  activeSection === "password"
                    ? "bg-[#393ee3] text-white"
                    : "text-gray-700 hover:bg-blue-100"
                }`}
              >
                Change Password
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("picture")}
                className={`w-full text-left py-2 px-4 rounded-md ${
                  activeSection === "picture"
                    ? "bg-[#393ee3] text-white"
                    : "text-gray-700 hover:bg-blue-100"
                }`}
              >
                Profile Picture
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("personal")}
                className={`w-full text-left py-2 px-4 rounded-md ${
                  activeSection === "personal"
                    ? "bg-[#393ee3] text-white"
                    : "text-gray-700 hover:bg-blue-100"
                }`}
              >
                Personal Info
              </button>
            </li>
            <li>
              <button
                onClick={handleSignOut}
                className="w-full text-left py-2 px-4 rounded-md bg-red-500 text-white hover:bg-red-600"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="lg:w-[75%] w-full bg-white rounded-lg shadow-md p-6">
          {activeSection === "profile" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Settings</h2>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div>
                  <label
                    htmlFor="displayName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="displayName"
                    name="displayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#393ee3]"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-200"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number (optional)
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#393ee3]"
                  />
                </div>
                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-[#393ee3] text-white font-medium rounded-md hover:bg-[#2c2fbf] focus:outline-none focus:ring-2 focus:ring-[#393ee3] focus:ring-offset-2 disabled:opacity-50"
                  >
                    {loading ? "Saving..." : "Update Profile"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeSection === "password" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Change Password</h2>
              <form onSubmit={handlePasswordUpdate} className="space-y-4">
                <div>
                  <label
                    htmlFor="currentPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#393ee3]"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#393ee3]"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmNewPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirmNewPassword"
                    name="confirmNewPassword"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#393ee3]"
                    required
                  />
                </div>
                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-[#393ee3] text-white font-medium rounded-md hover:bg-[#2c2fbf] focus:outline-none focus:ring-2 focus:ring-[#393ee3] focus:ring-offset-2 disabled:opacity-50"
                  >
                    {loading ? "Updating..." : "Change Password"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeSection === "picture" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Picture</h2>
              <form onSubmit={handleProfilePicUpload} className="space-y-4">
                <div>
                  <label
                    htmlFor="profilePic"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Upload Profile Picture
                  </label>
                  
                  
                  
                </div>
                <div className="text-sm text-gray-600">
                  <p><strong>NOTE:</strong></p>
                  <ul className="list-disc list-inside">
                    <li>Picture dimensions must be above 250 x 250px</li>
                    <li>File size less than 1MB</li>
                    <li>Allowed: JPEG & PNG</li>
                  </ul>
                </div>
                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    disabled={loading || !selectedFile}
                    className="px-6 py-2 bg-[#393ee3] text-white font-medium rounded-md hover:bg-[#2c2fbf] focus:outline-none focus:ring-2 focus:ring-[#393ee3] focus:ring-offset-2 disabled:opacity-50"
                  >
                    {loading ? "Uploading..." : "Upload Picture"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeSection === "personal" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Personal Info</h2>
              <form onSubmit={handlePersonalInfoUpdate} className="space-y-4">
                <div>
                  <label
                    htmlFor="yearOfBirth"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Year of Birth
                  </label>
                  <input
                    type="number"
                    id="yearOfBirth"
                    name="yearOfBirth"
                    value={yearOfBirth}
                    onChange={(e) => setYearOfBirth(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#393ee3]"
                    min="1900"
                    max={new Date().getFullYear()}
                  />
                </div>
                <div>
                  <label
                    htmlFor="ministry"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Ministry
                  </label>
                  <input
                    type="text"
                    id="ministry"
                    name="ministry"
                    value={ministry}
                    onChange={(e) => setMinistry(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#393ee3]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="course"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Course
                  </label>
                  <input
                    type="text"
                    id="course"
                    name="course"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#393ee3]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="homeCounty"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Home County
                  </label>
                  <input
                    type="text"
                    id="homeCounty"
                    name="homeCounty"
                    value={homeCounty}
                    onChange={(e) => setHomeCounty(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#393ee3]"
                  />
                </div>
                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-[#393ee3] text-white font-medium rounded-md hover:bg-[#2c2fbf] focus:outline-none focus:ring-2 focus:ring-[#393ee3] focus:ring-offset-2 disabled:opacity-50"
                  >
                    {loading ? "Saving..." : "Update Personal Info"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;