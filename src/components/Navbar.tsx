
"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Code2,
  GraduationCap,
  Menu,
  X,
  User,
  LogOut,
  LayoutDashboard,
  Loader2,
  ChevronDown,
} from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://backend-dlearning.onrender.com";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Programmes", href: "/programmes" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

interface Student {
  id: string;
  fullName: string;
  email: string;
  role: string;
  profilePicture?: string | null;
  isVerified?: boolean;
}

/* =====================================================
   NAVBAR WRAPPER
===================================================== */

export default function Navbar() {
  return (
    <Suspense fallback={<NavbarFallback />}>
      <NavbarContent />
    </Suspense>
  );
}

/* =====================================================
   NAVBAR FALLBACK
===================================================== */

function NavbarFallback() {
  return (
    <header className="dl-navbar">
      <div className="dl-navbar-container">
        <Link
          href="/"
          className="dl-brand"
          aria-label="Decent Learning homepage"
        >
          <span className="dl-brand-logo">
            <img
              src="/dlogo.jpeg"
              alt="Decent Learning logo"
              className="dl-logo-image"
            />
          </span>

          <div className="">
            <h1 className="text-xl font-extrabold tracking-tight text-[#185EC1]">
              Decent Learning
            </h1>
            <p className="text-xs font-medium text-slate-500">
              Learn. Build. Grow.
            </p>
          </div>
        </Link>
      </div>
    </header>
  );
}

/* =====================================================
   MAIN NAVBAR
===================================================== */

function NavbarContent() {
  const pathname = usePathname();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<Student | null>(null);
  const [profileMenuOpen, setProfileMenuOpen] =
    useState(false);
  const [loadingUser, setLoadingUser] = useState(true);

  function closeMenu() {
    setMenuOpen(false);
    setProfileMenuOpen(false);
  }

  function isLinkActive(href: string) {
    if (href === "/") {
      return pathname === "/";
    }

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  }

  /* =====================================================
     FETCH LOGGED-IN STUDENT
  ===================================================== */

  useEffect(() => {
    let mounted = true;

    async function fetchUser() {
      const token = localStorage.getItem("token");

      if (!token) {
        if (mounted) {
          setUser(null);
          setLoadingUser(false);
        }

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

        if (!mounted) return;

        if (response.ok && data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error(
          "Failed to fetch student profile:",
          error
        );

        if (mounted) {
          setUser(null);
        }
      } finally {
        if (mounted) {
          setLoadingUser(false);
        }
      }
    }

    fetchUser();

    // Update Navbar after login or registration.
    function handleAuthChanged() {
      setLoadingUser(true);
      fetchUser();
    }

    window.addEventListener(
      "auth-changed",
      handleAuthChanged
    );

    // Refresh profile when returning to the browser tab.
    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        fetchUser();
      }
    }

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      mounted = false;

      window.removeEventListener(
        "auth-changed",
        handleAuthChanged
      );

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, []);

  /* =====================================================
     LOGOUT
  ===================================================== */

  async function handleLogout() {
    const token = localStorage.getItem("token");

    try {
      if (token) {
        await fetch(`${API_URL}/api/auth/logout`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");

      setUser(null);
      setProfileMenuOpen(false);
      setMenuOpen(false);

      window.dispatchEvent(
        new Event("auth-changed")
      );

      router.push("/login");
      router.refresh();
    }
  }

  /* =====================================================
     PROFILE IMAGE
  ===================================================== */

  function getProfileImage() {
    return (
      user?.profilePicture ||
      "/dlogo.jpeg"
    );
  }

  return (
    <header className="dl-navbar">
      <div className="dl-navbar-container">
        {/* BRAND */}

        <Link
          href="/"
          className="dl-brand"
          aria-label="Decent Learning homepage"
          onClick={closeMenu}
        >
          <span className="dl-brand-logo">
            <img
              src="/dlogo.jpeg"
              alt="Decent Learning logo"
              className="dl-logo-image"
            />
          </span>

          <div className="">
            <h1 className="text-xl font-extrabold tracking-tight text-[#185EC1]">
              Decent Learning
            </h1>
            <p className="text-xs font-medium text-slate-500">
              Learn. Build. Grow.
            </p>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}

        <nav
          className="dl-desktop-nav"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => {
            const isActive = isLinkActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`dl-nav-link ${
                  isActive ? "is-active" : ""
                }`}
                aria-current={
                  isActive ? "page" : undefined
                }
              >
                {link.label}

                {isActive && (
                  <motion.span
                    className="dl-nav-indicator"
                    layoutId="dl-nav-indicator"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* DESKTOP ACTIONS */}

        <div className="dl-nav-actions">
          {loadingUser ? (
            <div className="flex h-10 w-10 items-center justify-center">
              <Loader2
                size={20}
                className="animate-spin text-[#0A66EC]"
              />
            </div>
          ) : user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setProfileMenuOpen(
                    (current) => !current
                  )
                }
                className="flex items-center gap-2 rounded-full border border-blue-100 bg-white p-1 transition hover:bg-blue-50"
                aria-label="Open student profile menu"
                aria-expanded={profileMenuOpen}
              >
                <img
                  src={getProfileImage()}
                  alt={user.fullName}
                  onError={(event) => {
                    event.currentTarget.src =
                      "/dlogo.jpeg";
                  }}
                  className="h-10 w-10 rounded-full object-cover"
                />

                <ChevronDown
                  size={16}
                  className="mr-2 text-[#0A66EC]"
                />
              </button>

              <AnimatePresence>
                {profileMenuOpen && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 10,
                      scale: 0.98,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: 10,
                      scale: 0.98,
                    }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 top-14 z-50 w-64 overflow-hidden rounded-2xl border border-blue-100 bg-white p-3 shadow-xl"
                  >
                    <div className="border-b border-gray-100 px-3 pb-3">
                      <p className="truncate font-semibold text-gray-900">
                        {user.fullName}
                      </p>

                      <p className="truncate text-sm text-gray-500">
                        {user.email}
                      </p>
                    </div>

                    <Link
                      href="/student/profile"
                      onClick={() =>
                        setProfileMenuOpen(false)
                      }
                      className="mt-2 flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-700 transition hover:bg-blue-50 hover:text-[#0A66EC]"
                    >
                      <User size={18} />
                      My Profile
                    </Link>

                    <Link
                      href="/student/dashboard"
                      onClick={() =>
                        setProfileMenuOpen(false)
                      }
                      className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-700 transition hover:bg-blue-50 hover:text-[#0A66EC]"
                    >
                      <LayoutDashboard size={18} />
                      Student Dashboard
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-red-600 transition hover:bg-red-50"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="dl-login-link"
              >
                Log in
              </Link>

              <Link
                href="/register"
                className="dl-get-started"
              >
                <span>Start Learning</span>
                <ArrowRight size={16} />
              </Link>
            </>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}

        <button
          type="button"
          className="dl-menu-toggle"
          aria-label={
            menuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          aria-controls="dl-mobile-navigation"
          onClick={() =>
            setMenuOpen((current) => !current)
          }
        >
          <AnimatePresence
            mode="wait"
            initial={false}
          >
            <motion.span
              key={menuOpen ? "close" : "menu"}
              initial={{
                opacity: 0,
                rotate: -35,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                rotate: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                rotate: 35,
                scale: 0.8,
              }}
              transition={{ duration: 0.15 }}
              className="dl-menu-icon"
            >
              {menuOpen ? (
                <X size={23} />
              ) : (
                <Menu size={23} />
              )}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      {/* MOBILE NAVIGATION */}

      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            id="dl-mobile-navigation"
            className="dl-mobile-panel"
            initial={{
              opacity: 0,
              height: 0,
              y: -8,
            }}
            animate={{
              opacity: 1,
              height: "auto",
              y: 0,
            }}
            exit={{
              opacity: 0,
              height: 0,
              y: -8,
            }}
            transition={{
              duration: 0.22,
              ease: "easeInOut",
            }}
          >
            <nav
              className="dl-mobile-nav"
              aria-label="Mobile navigation"
            >
              {navLinks.map((link, index) => {
                const isActive = isLinkActive(
                  link.href
                );

                return (
                  <motion.div
                    key={link.href}
                    initial={{
                      opacity: 0,
                      x: -10,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      duration: 0.18,
                      delay: index * 0.035,
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className={`dl-mobile-link ${
                        isActive ? "is-active" : ""
                      }`}
                      aria-current={
                        isActive ? "page" : undefined
                      }
                    >
                      <span>{link.label}</span>
                      <ArrowRight size={17} />
                    </Link>
                  </motion.div>
                );
              })}

              {/* MOBILE ACTIONS */}

              <div className="dl-mobile-actions">
                {loadingUser ? (
                  <div className="flex justify-center py-4">
                    <Loader2
                      size={22}
                      className="animate-spin text-[#0A66EC]"
                    />
                  </div>
                ) : user ? (
                  <>
                    <div className="flex items-center gap-3 rounded-xl bg-blue-50 p-3">
                      <img
                        src={getProfileImage()}
                        alt={user.fullName}
                        onError={(event) => {
                          event.currentTarget.src =
                            "/dlogo.jpeg";
                        }}
                        className="h-12 w-12 rounded-full object-cover"
                      />

                      <div className="min-w-0">
                        <p className="truncate font-semibold text-gray-900">
                          {user.fullName}
                        </p>

                        <p className="truncate text-sm text-gray-500">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <Link
                      href="/student/profile"
                      onClick={closeMenu}
                      className="dl-mobile-login"
                    >
                      <User size={18} />
                      My Profile
                    </Link>

                    <Link
                      href="/student/dashboard"
                      onClick={closeMenu}
                      className="dl-mobile-cta"
                    >
                      <GraduationCap size={19} />
                      <span>
                        Student Dashboard
                      </span>
                      <ArrowRight size={17} />
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-600 transition hover:bg-red-50"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="dl-mobile-login"
                      onClick={closeMenu}
                    >
                      Log in
                    </Link>

                    <Link
                      href="/register"
                      className="dl-mobile-cta"
                      onClick={closeMenu}
                    >
                      <GraduationCap size={19} />
                      <span>Start Learning</span>
                      <ArrowRight size={17} />
                    </Link>
                  </>
                )}
              </div>

              {/* MOBILE FOOTER */}

              <div className="dl-mobile-footer">
                <span className="dl-mobile-footer-icon">
                  <Code2 size={16} />
                </span>

                <span>
                  Learn technology. Build your future.
                </span>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
