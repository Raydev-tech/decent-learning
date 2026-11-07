"use client";

import { useState, type ChangeEvent, type FormEvent, type CSSProperties } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  ArrowRight,
  Eye,
  EyeOff,
  GraduationCap,
  LockKeyhole,
  Mail,
  User,
  CheckCircle2,
} from "lucide-react";

import { motion } from "framer-motion";
import toast from "react-hot-toast";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://backend-dlearning.onrender.com";

interface RegisterResponse {
  success?: boolean;
  message?: string;
  token?: string;
  data?: {
    token?: string;
    user?: {
      id?: string;
      fullName?: string;
      email?: string;
      role?: string;
    };
  };
  user?: {
    id?: string;
    fullName?: string;
    email?: string;
    role?: string;
  };
}

export default function RegisterPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) return;

    const fullName = form.fullName.trim();
    const email = form.email.trim().toLowerCase();
    const password = form.password;

    if (fullName.length < 2) {
      toast.error("Please enter your full name.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must contain at least 8 characters.");
      return;
    }

    if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
      toast.error("Use a password containing letters and numbers.");
      return;
    }

    if (password !== form.confirmPassword) {
      toast.error("Your passwords do not match.");
      return;
    }

    if (!form.agree) {
      toast.error("Please accept the Terms of Service and Privacy Policy.");
      return;
    }

    setLoading(true);

    const toastId = toast.loading("Creating your account...");

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
        }),
      });

      const result: RegisterResponse = await response.json();

      if (!response.ok) {
        toast.error(
          result.message || "Unable to create your account.",
          { id: toastId }
        );
        return;
      }

      const token = result.token || result.data?.token;

      if (token) {
        localStorage.setItem("token", token);

        window.dispatchEvent(new Event("auth-changed"));

        toast.success(
          result.message || "Account created successfully!",
          { id: toastId }
        );

        router.push("/student/dashboard");
        return;
      }

      // Registration succeeded but no token was returned.
      toast.success(
        result.message || "Account created successfully!",
        { id: toastId }
      );

      setSuccess(true);
    } catch (error) {
      console.error("Registration error:", error);

      toast.error(
        "Unable to connect to the server. Please try again.",
        { id: toastId }
      );
    } finally {
      setLoading(false);
    }
  }

  const inputStyle: CSSProperties = {
    width: "100%",
    padding: "14px 15px 14px 44px",
    border: "1px solid #dce5e8",
    borderRadius: "12px",
    background: "#fff",
    color: "#102a35",
    outline: "none",
    fontSize: "14px",
    boxSizing: "border-box",
  };

  const labelStyle: CSSProperties = {
    display: "block",
    marginBottom: "8px",
    color: "#183640",
    fontWeight: 600,
    fontSize: "13px",
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#FEFEFE",
        color: "#102a35",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <header
        style={{
          padding: "20px 6%",
          background: "#fff",
          borderBottom: "1px solid #e8eff1",
        }}
      >
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            color: "#102a35",
            textDecoration: "none",
            fontWeight: 800,
            fontSize: "21px",
          }}
        >
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-[#0A66EC] text-white">
            <img
              src="/dlogo.jpeg"
              alt="Decent Learning logo"
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-[#185EC1]">
              Decent Learning
            </h1>

            <p className="text-xs font-medium text-slate-500">
              Access • Learn • Own
            </p>
          </div>
        </Link>
      </header>

      {/* Main Section */}
      <section
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
        }}
      >
        {/* Left Side */}
        <div
          style={{
            background:
              "linear-gradient(145deg, #0A66EC, #185EC1, #227BEA)",
            color: "#fff",
            padding: "clamp(32px, 6vw, 76px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "8px 13px",
                borderRadius: "30px",
                background: "rgba(255,255,255,0.13)",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "1px",
              }}
            >
              ACCESS • LEARN • OWN
            </span>

            <h1
              style={{
                fontSize: "clamp(34px, 4vw, 56px)",
                lineHeight: 1.12,
                margin: "26px 0 18px",
                letterSpacing: "-1.5px",
              }}
            >
              Start building
              <br />
              your future today.
            </h1>

            <p
              style={{
                maxWidth: "450px",
                lineHeight: 1.8,
                color: "#EAF2FF",
                fontSize: "16px",
              }}
            >
              Learn technology at your own pace, build real projects,
              develop practical skills, and prepare for new opportunities.
            </p>

            <div
              style={{
                display: "grid",
                gap: "18px",
                marginTop: "35px",
              }}
            >
              {[
                "Learn web development and programming",
                "Explore Web3, blockchain and cybersecurity",
                "Build projects as you learn",
                "Track your learning journey",
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    color: "#f0fbfb",
                    fontSize: "14px",
                  }}
                >
                  <CheckCircle2 size={19} color="#91B8F7" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Side */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "clamp(25px, 5vw, 65px)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              width: "100%",
              maxWidth: "440px",
              background: "#fff",
              border: "1px solid #e5edef",
              borderRadius: "22px",
              padding: "clamp(22px, 4vw, 38px)",
              boxShadow: "0 18px 55px rgba(10,102,236,0.08)",
            }}
          >
            {success ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "25px 0",
                }}
              >
                <div
                  style={{
                    width: "65px",
                    height: "65px",
                    borderRadius: "50%",
                    background: "#EAF2FF",
                    color: "#0A66EC",
                    display: "grid",
                    placeItems: "center",
                    margin: "0 auto 20px",
                  }}
                >
                  <CheckCircle2 size={34} />
                </div>

                <h2
                  style={{
                    fontSize: "27px",
                    marginBottom: "12px",
                  }}
                >
                  Account created!
                </h2>

                <p
                  style={{
                    color: "#627780",
                    lineHeight: 1.7,
                  }}
                >
                  Your Decent Learning account has been created.
                  Please sign in to continue.
                </p>

                <Link
                  href="/login"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    borderRadius: "12px",
                    padding: "15px",
                    marginTop: "22px",
                    background: "#0A66EC",
                    color: "#fff",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  Continue to login <ArrowRight size={17} />
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setSuccess(false);

                    setForm({
                      fullName: "",
                      email: "",
                      password: "",
                      confirmPassword: "",
                      agree: false,
                    });
                  }}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#185EC1",
                    cursor: "pointer",
                    marginTop: "15px",
                  }}
                >
                  Register another student
                </button>
              </div>
            ) : (
              <>
                {/* Form Heading */}
                <div style={{ marginBottom: "28px" }}>
                  <div
                    style={{
                      width: "46px",
                      height: "46px",
                      display: "grid",
                      placeItems: "center",
                      background: "#EAF2FF",
                      color: "#0A66EC",
                      borderRadius: "13px",
                      marginBottom: "20px",
                    }}
                  >
                    <GraduationCap size={25} />
                  </div>

                  <h2
                    style={{
                      fontSize: "30px",
                      margin: "0 0 9px",
                      letterSpacing: "-0.7px",
                    }}
                  >
                    Create your account
                  </h2>

                  <p
                    style={{
                      color: "#6b7f87",
                      fontSize: "14px",
                    }}
                  >
                    Join Decent Learning and begin your journey.
                  </p>
                </div>

                {/* Registration Form */}
                <form onSubmit={handleSubmit}>
                  {/* Full Name */}
                  <div style={{ marginBottom: "18px" }}>
                    <label htmlFor="fullName" style={labelStyle}>
                      Full name
                    </label>

                    <div style={{ position: "relative" }}>
                      <User
                        size={18}
                        style={{
                          position: "absolute",
                          left: "14px",
                          top: "14px",
                          color: "#84969d",
                        }}
                      />

                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        autoComplete="name"
                        placeholder="Enter your full name"
                        value={form.fullName}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div style={{ marginBottom: "18px" }}>
                    <label htmlFor="email" style={labelStyle}>
                      Email address
                    </label>

                    <div style={{ position: "relative" }}>
                      <Mail
                        size={18}
                        style={{
                          position: "absolute",
                          left: "14px",
                          top: "14px",
                          color: "#84969d",
                        }}
                      />

                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div style={{ marginBottom: "18px" }}>
                    <label htmlFor="password" style={labelStyle}>
                      Password
                    </label>

                    <div style={{ position: "relative" }}>
                      <LockKeyhole
                        size={18}
                        style={{
                          position: "absolute",
                          left: "14px",
                          top: "14px",
                          color: "#84969d",
                        }}
                      />

                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="At least 8 characters"
                        value={form.password}
                        onChange={handleChange}
                        required
                        style={{
                          ...inputStyle,
                          paddingRight: "45px",
                        }}
                      />

                      <button
                        type="button"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          position: "absolute",
                          right: "12px",
                          top: "12px",
                          border: "none",
                          background: "transparent",
                          color: "#84969d",
                          cursor: "pointer",
                        }}
                      >
                        {showPassword ? (
                          <EyeOff size={19} />
                        ) : (
                          <Eye size={19} />
                        )}
                      </button>
                    </div>

                    <p
                      style={{
                        fontSize: "12px",
                        color: "#7b8d94",
                        marginTop: "7px",
                      }}
                    >
                      Use at least 8 characters with letters and numbers.
                    </p>
                  </div>

                  {/* Confirm Password */}
                  <div style={{ marginBottom: "20px" }}>
                    <label
                      htmlFor="confirmPassword"
                      style={labelStyle}
                    >
                      Confirm password
                    </label>

                    <div style={{ position: "relative" }}>
                      <LockKeyhole
                        size={18}
                        style={{
                          position: "absolute",
                          left: "14px",
                          top: "14px",
                          color: "#84969d",
                        }}
                      />

                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={
                          showConfirmPassword ? "text" : "password"
                        }
                        autoComplete="new-password"
                        placeholder="Enter your password again"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        required
                        style={{
                          ...inputStyle,
                          paddingRight: "45px",
                        }}
                      />

                      <button
                        type="button"
                        aria-label={
                          showConfirmPassword
                            ? "Hide confirmation password"
                            : "Show confirmation password"
                        }
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        style={{
                          position: "absolute",
                          right: "12px",
                          top: "12px",
                          border: "none",
                          background: "transparent",
                          color: "#84969d",
                          cursor: "pointer",
                        }}
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={19} />
                        ) : (
                          <Eye size={19} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Terms and Privacy */}
                  <label
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      fontSize: "13px",
                      lineHeight: 1.6,
                      color: "#607780",
                      marginBottom: "20px",
                    }}
                  >
                    <input
                      type="checkbox"
                      name="agree"
                      checked={form.agree}
                      onChange={handleChange}
                      style={{
                        marginTop: "4px",
                        accentColor: "#0A66EC",
                      }}
                    />

                    <span>
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        style={{ color: "#185EC1" }}
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        style={{ color: "#185EC1" }}
                      >
                        Privacy Policy
                      </Link>
                      .
                    </span>
                  </label>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      padding: "15px",
                      border: "none",
                      borderRadius: "12px",
                      background: loading ? "#5B99F6" : "#0A66EC",
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: "15px",
                      cursor: loading ? "wait" : "pointer",
                      opacity: loading ? 0.8 : 1,
                    }}
                  >
                    {loading ? "Creating account..." : "Create account"}

                    {!loading && <ArrowRight size={18} />}
                  </button>
                </form>

                {/* Login Link */}
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "14px",
                    color: "#71838a",
                    marginTop: "24px",
                  }}
                >
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    style={{
                      color: "#0A66EC",
                      fontWeight: 700,
                    }}
                  >
                    Sign in
                  </Link>
                </p>
              </>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
}