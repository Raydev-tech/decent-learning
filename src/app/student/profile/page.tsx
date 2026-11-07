
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Camera,
  User,
  Mail,
  Save,
  Loader2,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";
import toast from "react-hot-toast";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://backend-dlearning.onrender.com";

interface Student {
  id: string;
  fullName: string;
  email: string;
  role: string;
  profilePicture?: string | null;
  isVerified?: boolean;
  isActive?: boolean;
  createdAt?: string;
}

export default function StudentProfilePage() {
  const [student, setStudent] =
    useState<Student | null>(null);

  const [fullName, setFullName] = useState("");
  const [profilePicture, setProfilePicture] =
    useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* =====================================================
     FETCH STUDENT PROFILE
  ===================================================== */

  useEffect(() => {
    let mounted = true;

    async function loadProfile() {
      const token = localStorage.getItem("token");

      if (!token) {
        window.location.href = "/login";
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/api/auth/profile`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
            return;
          }

          throw new Error(
            data.message ||
              "Unable to retrieve your profile"
          );
        }

        if (!mounted) return;

        const profile: Student = data.user;

        setStudent(profile);
        setFullName(profile.fullName || "");
        setProfilePicture(
          profile.profilePicture || ""
        );
      } catch (error) {
        if (mounted) {
          toast.error(
            error instanceof Error
              ? error.message
              : "Unable to load profile"
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      mounted = false;
    };
  }, []);

  /* =====================================================
     UPDATE STUDENT PROFILE
  ===================================================== */

  async function handleUpdateProfile(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first");
      window.location.href = "/login";
      return;
    }

    if (!fullName.trim()) {
      toast.error("Full name is required");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(
        `${API_URL}/auth/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            fullName: fullName.trim(),
            profilePicture:
              profilePicture.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
          return;
        }

        throw new Error(
          data.message ||
            "Profile update failed"
        );
      }

      const updatedStudent: Student =
        data.user;

      setStudent(updatedStudent);
      setFullName(
        updatedStudent.fullName || ""
      );
      setProfilePicture(
        updatedStudent.profilePicture || ""
      );

      // Update Navbar profile information immediately.
      window.dispatchEvent(
        new Event("auth-changed")
      );

      toast.success(
        "Profile updated successfully"
      );
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to update profile"
      );
    } finally {
      setSaving(false);
    }
  }

  /* =====================================================
     LOADING STATE
  ===================================================== */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F4F8FF]">
        <div className="flex flex-col items-center gap-4">
          <Loader2
            size={38}
            className="animate-spin text-[#0A66EC]"
          />

          <p className="text-sm font-medium text-gray-500">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  /* =====================================================
     PROFILE ERROR STATE
  ===================================================== */

  if (!student) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#F4F8FF] px-4">
        <div className="rounded-3xl border border-blue-100 bg-white p-8 text-center shadow-sm">
          <User
            size={40}
            className="mx-auto text-[#0A66EC]"
          />

          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            Profile unavailable
          </h1>

          <p className="mt-2 text-gray-500">
            We could not load your student profile.
          </p>

          <Link
            href="/login"
            className="mt-6 inline-flex rounded-xl bg-[#0A66EC] px-6 py-3 font-semibold text-white transition hover:bg-[#185EC1]"
          >
            Login Again
          </Link>
        </div>
      </main>
    );
  }

  /* =====================================================
     MAIN PROFILE PAGE
  ===================================================== */

  return (
    <main className="min-h-screen bg-[#F4F8FF] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        {/* BACK TO DASHBOARD */}

        <Link
          href="/student/dashboard"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0A66EC] transition hover:text-[#185EC1]"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        {/* PAGE HEADING */}

        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-[#0A66EC]">
              <User size={24} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-[#12345A] sm:text-3xl">
                My Profile
              </h1>

              <p className="mt-1 text-sm text-gray-500 sm:text-base">
                Manage your personal information.
              </p>
            </div>
          </div>
        </div>

        {/* PROFILE CONTENT */}

        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
          {/* LEFT PROFILE CARD */}

          <div className="h-fit rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">
            <div className="flex flex-col items-center text-center">
              {/* PROFILE IMAGE */}

              <div className="relative">
                <img
                  src={
                    profilePicture ||
                    "/dlogo.jpeg"
                  }
                  alt={student.fullName}
                  onError={(event) => {
                    event.currentTarget.src =
                      "/dlogo.jpeg";
                  }}
                  className="h-32 w-32 rounded-full border-4 border-blue-50 bg-blue-50 object-cover"
                />

                <div className="absolute bottom-1 right-1 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-[#0A66EC] text-white">
                  <Camera size={18} />
                </div>
              </div>

              {/* STUDENT NAME */}

              <h2 className="mt-5 break-words text-xl font-bold text-gray-900">
                {student.fullName}
              </h2>

              {/* STUDENT EMAIL */}

              <p className="mt-1 break-all text-sm text-gray-500">
                {student.email}
              </p>

              {/* STUDENT ROLE */}

              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold capitalize text-[#0A66EC]">
                <GraduationCap size={17} />
                {student.role}
              </div>

              {/* VERIFIED STATUS */}

              <div className="mt-5 flex items-center gap-2 text-sm">
                <ShieldCheck
                  size={18}
                  className={
                    student.isVerified
                      ? "text-green-600"
                      : "text-gray-400"
                  }
                />

                <span
                  className={
                    student.isVerified
                      ? "text-green-600"
                      : "text-gray-500"
                  }
                >
                  {student.isVerified
                    ? "Verified Account"
                    : "Account Not Verified"}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT EDIT PROFILE CARD */}

          <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">
            <div className="border-b border-gray-100 pb-5">
              <h2 className="text-xl font-bold text-gray-900">
                Personal Information
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Edit your account details below.
              </p>
            </div>

            <form
              onSubmit={handleUpdateProfile}
              className="mt-6 space-y-6"
            >
              {/* FULL NAME */}

              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Full Name
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(event) =>
                      setFullName(
                        event.target.value
                      )
                    }
                    required
                    maxLength={50}
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-12 pr-4 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#0A66EC] focus:ring-4 focus:ring-blue-50"
                  />
                </div>
              </div>

              {/* EMAIL */}

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="email"
                    type="email"
                    value={student.email}
                    disabled
                    className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-gray-500"
                  />
                </div>

                <p className="mt-2 text-xs text-gray-400">
                  Your email address is read-only.
                </p>
              </div>

              {/* PROFILE IMAGE URL */}

              <div>
                <label
                  htmlFor="profilePicture"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Profile Image URL
                </label>

                <input
                  id="profilePicture"
                  type="url"
                  value={profilePicture}
                  onChange={(event) =>
                    setProfilePicture(
                      event.target.value
                    )
                  }
                  placeholder="https://example.com/image.jpg"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#0A66EC] focus:ring-4 focus:ring-blue-50"
                />

                <p className="mt-2 text-xs text-gray-400">
                  Paste a direct link to your profile image.
                </p>

                {/* IMAGE PREVIEW */}

                {profilePicture.trim() && (
                  <div className="mt-4">
                    <p className="mb-2 text-xs font-medium text-gray-500">
                      Image Preview
                    </p>

                    <img
                      src={profilePicture}
                      alt="Profile preview"
                      onError={(event) => {
                        event.currentTarget.style.display =
                          "none";
                      }}
                      className="h-20 w-20 rounded-full border border-blue-100 object-cover"
                    />
                  </div>
                )}
              </div>

              {/* SAVE BUTTON */}

              <div className="border-t border-gray-100 pt-5">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0A66EC] px-6 py-3.5 font-semibold text-white transition hover:bg-[#185EC1] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {saving ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />

                      Saving Changes...
                    </>
                  ) : (
                    <>
                      <Save size={18} />

                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
