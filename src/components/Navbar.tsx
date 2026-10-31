
"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Code2,
  GraduationCap,
  Menu,
  X,
} from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Programmes", href: "/programmes" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/* =====================================================
   NAVBAR WRAPPER
   The Suspense boundary must be outside the component
   that calls usePathname().
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

          <span className="dl-brand-copy">
            <span className="dl-brand-name">
              Decent Learning
            </span>

            <span className="dl-brand-tagline">
              Learn. Build. Grow.
            </span>
          </span>
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
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
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

          <span className="dl-brand-copy">
            <span className="dl-brand-name">
              Decent Learning
            </span>

            <span className="dl-brand-tagline">
              Learn. Build. Grow.
            </span>
          </span>
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
          <AnimatePresence mode="wait" initial={false}>
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
                const isActive = isLinkActive(link.href);

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
