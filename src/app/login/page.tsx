
"use client";

import { useState } from "react";
import Link from "next/link";
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

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!password) {
      toast.error("Please enter your password.");
      return;
    }

    // Demo only: real authentication will be connected later.
    setLoading(true);

    const toastId = toast.loading("Checking your details...");

    window.setTimeout(() => {
      setLoading(false);
      toast.dismiss(toastId);

      toast.error(
        "Login is not connected yet. Please connect the authentication backend."
      );
    }, 600);
  }

  const inputStyle: React.CSSProperties = {
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

  const labelStyle: React.CSSProperties = {
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
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0A66EC] text-white">
            <img src="/dlogo.jpeg" alt="" />
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

      <section
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
        }}
      >
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
                <strong style={{ display: "block", marginBottom: "5px" }}>
                  Your learning journey
                </strong>

                <span style={{ fontSize: "13px", color: "#EAF2FF" }}>
                  One step at a time, one skill at a time.
                </span>
              </div>
            </div>
          </motion.div>
        </div>

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
                    style={{ ...inputStyle, paddingRight: "45px" }}
                  />

                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
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
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>
              </div>

              <div style={{ textAlign: "right", marginBottom: "24px" }}>
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
                }}
              >
                {loading ? "Checking details..." : "Sign in"}
                {!loading && <ArrowRight size={18} />}
              </button>
            </form>

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
              Secure sign-in will be available when the authentication
              backend is connected.
            </p>
          </motion.div>
        </div>
      </section>

      {/* <footer
        style={{
          textAlign: "center",
          padding: "20px",
          color: "#758890",
          fontSize: "12px",
          background: "#fff",
          borderTop: "1px solid #e8eff1",
        }}
      >
        © {new Date().getFullYear()} Decent Learning. Access • Learn • Own.
      </footer> */}
    </main>
  );
}
