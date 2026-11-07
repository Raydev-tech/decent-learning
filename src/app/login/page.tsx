"use client";

import { useState, type FormEvent, type CSSProperties } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  ArrowRight,
  Eye,
  EyeOff,
  Mail,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

import { motion } from "framer-motion";
import toast from "react-hot-toast";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://backend-dlearning.onrender.com";

interface LoginResponse {
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

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) return;

    const normalizedEmail = email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!password.trim()) {
      toast.error("Please enter your password.");
      return;
    }

    setLoading(true);

    const toastId = toast.loading("Checking your details...");

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: normalizedEmail,
          password,
        }),
      });

      const result: LoginResponse = await response.json();

      if (!response.ok) {
        toast.error(
          result.message || "Invalid email or password.",
          { id: toastId }
        );
        return;
      }

      const token = result.token || result.data?.token;

      if (!token) {
        toast.error(
          "Login succeeded, but the authentication token was not returned.",
          { id: toastId }
        );
        return;
      }

      // Store the authentication token.
      localStorage.setItem("token", token);

      // Notify Navbar and other components that the user is logged in.
      window.dispatchEvent(new Event("auth-changed"));

      toast.success(
        result.message || "Login successful! Welcome back.",
        { id: toastId }
      );

      // Redirect the student to the dashboard.
      router.push("/student/dashboard");
    } catch (error) {
      console.error("Login error:", error);

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
    padding: "14px 15px 14px 45px",
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
        display: "flex",
        flexDirection: "column",
        background: "#FEFEFE",
        color: "#102a35",
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
            textDecoration: "none",
            color: "#102a35",
            fontSize: "21px",
            fontWeight: 800,
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
                fontSize: "clamp(35px, 4vw, 57px)",
                lineHeight: 1.12,
                margin: "26px 0 18px",
                letterSpacing: "-1.5px",
              }}
            >
              Welcome back
              <br />
              to learning.
            </h1>

            <p
              style={{
                maxWidth: "440px",
                lineHeight: 1.8,
                color: "#EAF2FF",
                fontSize: "16px",
              }}
            >
              Continue learning, pick up where you stopped, and keep
              building the skills that move you forward.
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                marginTop: "35px",
                padding: "18px",
                borderRadius: "15px",
                background: "rgba(255,255,255,0.09)",
                maxWidth: "390px",
              }}
            >
              <ShieldCheck size={32} color="#91B8F7" />

              <div>
                <strong
                  style={{
                    display: "block",
                    marginBottom: "5px",
                  }}
                >
                  Your learning journey
                </strong>

                <span
                  style={{
                    fontSize: "13px",
                    color: "#EAF2FF",
                  }}
                >
                  One step at a time, one skill at a time.
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Login Form */}
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
              padding: "clamp(22px, 4vw, 38px)",
              background: "#fff",
              border: "1px solid #e5edef",
              borderRadius: "22px",
              boxShadow: "0 18px 55px rgba(10,102,236,0.08)",
            }}
          >
            <div style={{ marginBottom: "30px" }}>
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
                <LockKeyhole size={24} />
              </div>

              <h2
                style={{
                  fontSize: "30px",
                  margin: "0 0 9px",
                  letterSpacing: "-0.7px",
                }}
              >
                Sign in
              </h2>

              <p style={{ color: "#6b7f87", fontSize: "14px" }}>
                Enter your details to continue.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div style={{ marginBottom: "20px" }}>
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
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Password */}
              <div style={{ marginBottom: "14px" }}>
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
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
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
              </div>

              {/* Forgot Password */}
              <div
                style={{
                  textAlign: "right",
                  marginBottom: "24px",
                }}
              >
                <Link
                  href="/forgot-password"
                  style={{
                    color: "#0A66EC",
                    fontSize: "13px",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
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
                {loading ? "Checking details..." : "Sign in"}

                {!loading && <ArrowRight size={18} />}
              </button>
            </form>

            {/* Divider */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                margin: "26px 0",
                color: "#a1afb4",
                fontSize: "12px",
              }}
            >
              <div
                style={{
                  height: "1px",
                  background: "#e7edef",
                  flex: 1,
                }}
              />

              OR

              <div
                style={{
                  height: "1px",
                  background: "#e7edef",
                  flex: 1,
                }}
              />
            </div>

            {/* Register Link */}
            <p
              style={{
                textAlign: "center",
                fontSize: "14px",
                color: "#71838a",
              }}
            >
              New to Decent Learning?{" "}
              <Link
                href="/register"
                style={{
                  color: "#0A66EC",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Create an account
              </Link>
            </p>

            <p
              style={{
                textAlign: "center",
                fontSize: "12px",
                lineHeight: 1.6,
                color: "#8a9aa0",
                marginTop: "25px",
              }}
            >
              Your account is protected by secure authentication.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}